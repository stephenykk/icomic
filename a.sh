awk '{print $9}' a.txt | sed 's@./cartoon/xinghezhizun/@@' | sed 's@/out.mp4@@' | sort -n

