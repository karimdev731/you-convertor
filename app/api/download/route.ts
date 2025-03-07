import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

// Configuration de ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const videoUrl = body.url;
    const format = body.format;

    if (!videoUrl || !format) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    if (!["mp3", "mp4"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Must be mp3 or mp4" },
        { status: 400 }
      );
    }

    if (!ytdl.validateURL(videoUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
    const fileName = `${title}.${format}`;
    const contentType = format === "mp3" ? "audio/mpeg" : "video/mp4";

    if (format === "mp3") {
      const audioStream = ytdl(videoUrl, { quality: "highestaudio" });
      return streamResponse(audioStream, fileName, contentType, req, "mp3");
    } else {
      const videoStream = ytdl(videoUrl, { quality: "highestvideo" });
      return streamResponse(videoStream, fileName, contentType, req, "mp4");
    }
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "An error occurred during conversion" },
      { status: 500 }
    );
  }
}

// Also support GET requests for backward compatibility
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const videoUrl = searchParams.get("url");
    const format = searchParams.get("format");

    if (!videoUrl || !format) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    if (!["mp3", "mp4"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Must be mp3 or mp4" },
        { status: 400 }
      );
    }

    if (!ytdl.validateURL(videoUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
    const fileName = `${title}.${format}`;
    const contentType = format === "mp3" ? "audio/mpeg" : "video/mp4";

    if (format === "mp3") {
      const audioStream = ytdl(videoUrl, { quality: "highestaudio" });
      return streamResponse(audioStream, fileName, contentType, req, "mp3");
    } else {
      const videoStream = ytdl(videoUrl, { quality: "highestvideo" });
      return streamResponse(videoStream, fileName, contentType, req, "mp4");
    }
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "An error occurred during conversion" },
      { status: 500 }
    );
  }
}

function streamResponse(
  stream: any,
  fileName: string,
  contentType: string,
  req: NextRequest,
  outputFormat: "mp3" | "mp4"
) {
  return new NextResponse(
    new ReadableStream({
      start(controller) {
        let ffmpegCommand;

        if (outputFormat === "mp3") {
          ffmpegCommand = ffmpeg(stream).audioBitrate(128).format("mp3");
        } else {
          ffmpegCommand = ffmpeg(stream).videoCodec("libx264").format("mp4");
        }

        ffmpegCommand.on("error", (err) => {
          console.error("FFmpeg error:", err);
          controller.error(err);
        });

        ffmpegCommand.pipe({
          write(chunk: any) {
            controller.enqueue(chunk);
          },
          end() {
            controller.close();
          },
          error(err: any) {
            controller.error(err);
          },
        });

        req.signal?.addEventListener("abort", () => {
          console.log("Client aborted download. Stopping FFmpeg...");
          ffmpegCommand.kill("SIGKILL");
          controller.close();
        });
      },
    }),
    {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": contentType,
      },
    }
  );
}
