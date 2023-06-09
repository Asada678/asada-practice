import torch
import datetime
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
from diffusers.models import AutoencoderKL

model_id = "andite/anything-v4.0"

vae_id = "./vae/anythingv4_vae"

# GPUチェック
if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

# モデル読み込み
pipe = StableDiffusionPipeline.from_pretrained(model_id)

# VAEの読み込み
pipe.vae = AutoencoderKL.from_pretrained(vae_id)

# スケジューラーの設定
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

# セーフティチェッカーの設定
pipe.safety_checker = (
    None if pipe.safety_checker is None else lambda images, **kwargs: (images, False)
)

# GPUのメモリが少ないマシンでの利用を想定
pipe.enable_attention_slicing()

# デバイスの設定
pipe = pipe.to(device)

async def generate_image(payload):
    generator_list = []

    # シードを設定
    for i in range(payload.count):
        generator_list.append(torch.Generator(device).manual_seed(payload.seedList[i]))

    # 画像生成
    images_list = pipe(
        [payload.prompt] * payload.count,
        width=payload.width,
        height= payload.height,
        negative_prompt=[payload.negative] * payload.count,
        guidance_scale=payload.scale,
        num_inference_steps=payload.steps,
        generator=generator_list
    )

    images = []
    # 画像を保存
    for i, image in enumerate(images_list["images"]):
        file_name = (
            "./output/image_"
            + datetime.datetime.now().strftime("%y%m%d_%H%M%S%f")[:-3]
            + ".png"
        )
        image.save(file_name)
        images.append(image)

    return images