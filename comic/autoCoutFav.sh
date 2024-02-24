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


function autoCoutFav() {
    usage 0 ${#@} "bash autoCoutFav.sh" || return 1

    # for dirName in `cat ./output/fav.tmp`
    for dirName in `cat ./output/fav.txt`
    do
        local from=`getFirst $dirName`
        local to=`getLast $dirName`
        if [ "$from" -a "$to" ]; then
            bash ./comic/autoCout.sh $dirName $from $to || return 1
        fi
    done

}

autoCoutFav $@