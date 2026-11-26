import sys
from PIL import Image, ImageDraw, ImageFont
out, files = sys.argv[1], sys.argv[2:]
w,h=432,540; pad=36; top=80
S=Image.new('RGB',(pad+len(files)*(w+pad), top+h+pad),'#e8e8ed'); d=ImageDraw.Draw(S)
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34)
for i,fn in enumerate(files):
    x=pad+i*(w+pad); S.paste(Image.open(fn).resize((w,h),Image.LANCZOS),(x,top)); d.text((x+w//2-10,22),str(i+1),fill='#1d1d1f',font=f)
S.save(out)
