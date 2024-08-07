# bash downloadOf.sh dir from to
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
    usage 0 ${#@} "bash autoCartoonNeed.sh" || return 1

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

function autoCartoonMoreAdvance() {
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

export -f autoCartoonMoreAdvance
export -f getFirst
export -f getLast
export -f mockDown


function downloadOf() {
    usage 2 ${#@} "bash downloadOf.sh <dirName> <from> [to]" || return 1
    
    
    # for dirName in `cat ./output/fav.tmp`
    for dirName in `cat ./output/fav.txt`
    do
        set +e
        local from=`getFirst $dirName`
        local to=`getLast $dirName`
        if [ "$from" -a "$to" ]; then
            echo yarn down $dirName "$from-$to"
            # yarn down $dirName "$from-$to" || return 1
            yarn down $dirName "$from-$to"
        fi
    done
}

# process 3 sn at the same time
function autoCartoonNeed() {
    local CONCURRENT_NUM=3
    # bash autoCartoonNeed.sh wanmei 1,20,30
    usage 2 ${#@} "bash autoCartoonNeed.sh <dirName> <snList>" || return 1

    local dirName=$1
    local snlist=${2}
    echo $snlist | xargs -d, -n $CONCURRENT_NUM | xargs -i bash -c "autoCartoonMoreAdvance $dirName {}"

    wait
    echo -e "\n\n>>> all jobs done"
}



autoCartoonNeed $@