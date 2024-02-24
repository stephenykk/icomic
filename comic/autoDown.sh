# bash autoDown.sh dir from to
echo "args: $@"

set +e


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

function autoDown() {
    usage 0 ${#@} "bash autoDown.sh" || return 1
    
    
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

function Cb() {
    echo "trape callback called"
}


trape Cb EXIT


autoDown $@