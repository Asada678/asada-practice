python -m venv myvenv
.\myvenv\Scripts\activate
pip3 install torch torchvision torchaudio
pip3 install -r requirements.txt
uvicorn main:app --reload
python .\convert_vae_pt_to_diffusers.py -vae_pt-path .\vae\anything-v4.0.vae.pt --dump_path .\vae\anythingv4_vae
