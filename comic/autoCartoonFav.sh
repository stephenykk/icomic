# bash autoDown.sh dir from to
echo "args: $@"

function usage() {
    local expectCount="$1"
    local actualCount="$2"
    local msg="$3"

    if [ "$expectCount" -gt "$actualCount" ]
    then
        echo "Usage: $msg"
        return 1
    fi

    return 0
}


function getFirst() {
    local dirName="$1"
    local first=`cat ./output/$dirName/new.json | sed 's/\[\|\]//g' | awk -F, '{print $1}'`
    echo $first
}
function getLast() {
    local dirName="$1"
    local last=`cat ./output/$dirName/new.json | sed 's/\[\|\]//g' | awk -F, '{print $NF}'`
    echo $last
}

function autoCdownFav_backup() {
    usage 0 ${#@} "bash autoCartoonFav.sh" || return 1

    for dirName in `cat ./output/fav.txt`
    do
        local from=`getFirst $dirName`
        local to=`getLast $dirName`
        if [ "$from" -a "$to" ]; then
            # echo ./comic/autoCartoon.sh $dirName $from $to || return 1
            bash ./comic/autoCdown.sh $dirName $from $to || return 1
            # bash ./comic/autoCartoon.sh $dirName $from $to || return 1
        fi
    done
}



function autoCdownOne() {
    local dirName="$1"
    local from=`getFirst $dirName`
    local to=`getLast $dirName`
    if [ "$from" -a "$to" ]; then
        # echo ./comic/autoCartoon.sh $dirName $from $to || return 1
        bash ./comic/autoCdown.sh $dirName $from $to || return 1
        # bash ./comic/autoCartoon.sh $dirName $from $to || return 1
    fi
}

function mockDown() {
    echo "[mockDown start]: $@ starting!"
    local sec=`shuf -i 1-8 -n 1`
    sleep $sec
    echo "[mockDown end]: $@ done! $sec "
}

function autoCartoonMore() {
    local dirList="$@"
    echo "==> WAIT for downloading: $dirList"
    for dirName in $dirList
    do
        local from=`getFirst $dirName`
        local to=`getLast $dirName`
        echo "INFO: $dirName  , $from  , $to"
        if [ "$from" -a "$to" ]; then
            # echo ./comic/autoCartoon.sh $dirName $from $to || return 1

            # bash ./comic/autoCdown.sh $dirName $from $to || return 1
            # bash ./comic/autoCdown.sh $dirName $from $to &
            # mockDown $dirName $from $to & 

            bash ./comic/autoCartoon.sh $dirName $from $to &
        fi
    done
    wait
    echo -e "==> FINISH  downloading: $dirList\n"
    
}

export -f autoCartoonMore
export -f getFirst
export -f getLast
export -f mockDown
export -f usage
export -f autoCdownOne


# process 3 fav at the same time
function autoCartoonFav() {
    local CONCURRENT_NUM=3
    usage 0 ${#@} "bash autoCartoonFav.sh" || return 1

    local allDirs=`cat ./output/fav.txt`
    echo $allDirs | xargs -n $CONCURRENT_NUM | xargs -i bash -c "autoCartoonMore {}"

    wait
    echo -e "\n\n>>> all jobs done"
}



autoCartoonFav $@