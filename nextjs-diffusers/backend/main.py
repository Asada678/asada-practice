from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from zipfile import ZipFile
from fastapi import HTTPException

import service
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

@app.get("/")
async def root():
    return {"message:" : "Hello World"}

class PayloadType(BaseModel):
    prompt: str
    negative: str
    count: int
    width: int
    height: int
    scale: float
    steps: int
    seedList: list

@app.post("/api/generate")
async def generate(payload: PayloadType):
    try:
        images = await service.generate_image(payload)
        # バイトデータを格納するバッファを作成
        # このバッファに圧縮された画像ファイルを保存
        zip_buffer = io.BytesIO()

        # zipファイルを作成、wモードでファイルに書き込む
        with ZipFile(zip_buffer, "w") as zip_file:
            # 生成された画像をループ
            for i, image in enumerate(images):
                # 画像データを一時的に保存するバッファを作成
                memory_stream = io.BytesIO()
                # 画像データをmemory_streamにPNG形式で保存
                image.save(memory_stream, format="png")
                # バッファを先頭に戻す
                # 次の操作でバッファのデータを正しく読みだすことが出来る
                memory_stream.seek(0)
                # zipファイルに画像データを書き込む
                zip_file.writestr(f"image_{i}.png", memory_stream.getvalue())
        # バッファを先頭に戻す
        zip_buffer.seek(0)

        # StreamingResponseを返すことで、バッファに保存された圧縮画像ファイルをダウンロードできる
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=images.zip"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))