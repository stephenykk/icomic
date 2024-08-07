# bash downIndex.sh dir from to
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


function getSnstr() {
    # getSnstr [dirName] sn1 sn2...
    if [[ ! "$1" =~ ^[0-9]+$ ]]; then
        # echo -e "FIRST ARGS IS DIR_NAME , SHIFT IT\n";
        shift 1;
    fi
    local ret=`echo $@ | tr ' ' ','`;
    echo $ret;
}

function getSnlist() {
    # getSnlist [dirName] sn1,sn2,sn3
    if [[ ! "$1" =~ ^[0-9,]+$ ]]; then
        # echo -e "FIRST ARGS IS DIR_NAME , SHIFT IT\n";
        shift 1;
    fi
    local ret=`echo $@ | xargs -d, -i echo {}`
    echo $ret
}




function getNoIndexSnstr() {
    cartoonDir="/e/icomic/cartoon"
    # echo "222===========getNoIndexSnstr=======> $@"
    # getNoIndexSnstr <dirName> sn1 sn2...
    local noIndexSnstr=""
    local dirName="$1"
    shift 1;

    local indexFile=""

    for sn in $@; do
        indexFile="$cartoonDir/$dirName/$sn/index.m3u8"
        # echo "==========XXXXXXXXXXXXXXXXXXXXXXXXXXXx  indexFile: $indexFile"

        if [ ! -f "$indexFile" ]; then
            if [ -z "$noIndexSnstr" ]; then
                noIndexSnstr="$sn"
            else
                noIndexSnstr="$noIndexSnstr,$sn"
            fi
        fi
    done

    echo $noIndexSnstr
}

export -f getSnstr
export -f getSnlist
export -f usage
export -f getNoIndexSnstr


function mockDown() {
    echo "[mockDown start]: $@ starting!"
    local sec=`shuf -i 1-8 -n 1`
    sleep $sec
    echo "[mockDown end]: $@ done! $sec "
}

function autoCartoonMoreAdvance() {
    # autoCartoonMoreAdvance <dirName> sn1 sn2 sn3...
    echo "1111==========>autoCartoonMoreAdvance args: $@"

    local dirName="$1"
    local snstr=`getSnstr $@`
    local snlist=`getSnlist $snstr`
    local noIndexSnstr=`getNoIndexSnstr $dirName $snlist`
    # getNoIndexSnstr $dirName $snlist
    
    # echo "============================KKKKK $dirName $snlist";
    
    # echo "\\\\\\\\\\\\\\\\\ noIndexSnstr: $noIndexSnstr"

    if [ ! -z "$noIndexSnstr" ]; then
        downIndex $dirName $noIndexSnstr
    fi

    
    echo "////////////////////=====> WAIT for downloading: $dirName $snlist ..."
    for sn in $snlist
    do
        local from=$sn
        local to=$sn
        echo "INFO: $dirName  , $from  , $to"
        if [ "$from" -a "$to" ]; then
            # echo ./comic/autoCartoon.sh $dirName $from $to || return 1

            # bash ./comic/autoCdown.sh $dirName $from $to || return 1
            # bash ./comic/autoCdown.sh $dirName $from $to &
            # mockDown $dirName $from $to & 

            # echo "bash ./comic/autoCartoon.sh $dirName $from $to &"
            bash ./comic/autoCartoon.sh $dirName $from $to &
        fi
    done
    wait
    echo -e "========> FINISH  downloading: $dirName $snlist\n"
    
}

function downIndex() {
    echo "==========>downIndex args: $@"

    local dirName="$1"
    # downIndex.sh wanmei 1,22,30
    usage 2 ${#@} "bash downIndex.sh <dirName> <snstr>" || return 1
    
    set +e

    local snstr=$2
    # yarn down $dirName "$from-$to" || return 1

    # echo yarn down $dirName "$snstr"
    yarn down $dirName "$snstr"

}

export -f autoCartoonMoreAdvance
export -f downIndex



# process 3 sn at the same time
function autoCartoonNeed() {
    local CONCURRENT_NUM=2
    # bash autoCartoonNeed.sh wanmei 1,20,30
    usage 2 ${#@} "bash autoCartoonNeed.sh <dirName> <snstr>" || return 1

    local dirName=$1
    local snstr=${2}
    echo $snstr | xargs -d, -n $CONCURRENT_NUM | xargs -i bash -c "autoCartoonMoreAdvance $dirName {}"

    wait
    echo -e "\n\n>>> all jobs done : $dirName $snstr"
}



autoCartoonNeed $@