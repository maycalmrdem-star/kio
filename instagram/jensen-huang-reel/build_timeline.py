import json, subprocess
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
lines = [
 ["At nine years old,","he was cleaning toilets.","At sixty-two,","his company became the first in history","worth five trillion dollars."],
 ["This is Jensen Huang.","Born in Taiwan in 1963.","The co-founder and CEO of Nvidia."],
 ["At nine, he was sent to America.","He ended up in a reform school","in rural Kentucky,","where his job was cleaning the bathrooms."],
 ["At fifteen, he washed dishes at Denny's.","He finished high school at sixteen,","studied engineering,","and earned a master's degree from Stanford."],
 ["In 1993, at thirty,","he sat in a Denny's booth with two friends,","and planned a chip company.","They called it Nvidia."],
 ["Their first chip failed.","Nvidia was thirty days","from going out of business.","Then came a hit.","And in 1999, the GeForce 256,","sold as the world's first GPU."],
 ["Then he made the biggest bet of his life.","Chips built for video games","became the engine of artificial intelligence."],
 ["One trillion.","Three trillion.","Four trillion.","Five trillion dollars.","The first company ever."],
 ["Where you start","doesn't decide where you end.","Follow for more stories like this."],
]
t = 0.35; scenes=[]
for i, chunks in enumerate(lines):
    d = dur(f'audio/vo-0{i+1}.mp3')
    vstart = t
    total = sum(len(c) for c in chunks); acc = 0; subs=[]
    for c in chunks:
        s = vstart + d*acc/total; acc += len(c); e = vstart + d*acc/total
        subs.append({"t0":round(s,3),"t1":round(e,3),"text":c})
    start = max(0, vstart-0.25)
    end = vstart + d + (0.45 if i < len(lines)-1 else 1.6)
    scenes.append({"i":i+1,"start":round(start,3),"end":round(end,3),"vstart":round(vstart,3),"vdur":round(d,3),"subs":subs})
    t = vstart + d + 0.45
json.dump({"scenes":scenes,"total":round(scenes[-1]["end"],3)}, open('timeline.json','w'), indent=1)
print(scenes[-1]["end"]); [print(s["i"], s["start"], s["vstart"], s["end"]) for s in scenes]
