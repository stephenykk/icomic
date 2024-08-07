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


function autoCartoon() {
    usage 2 ${#@} "bash autoCartoon.sh <dir> <from> [to]" || return 1
    local dir="$1"
    local from="$2"
    local to="${3:-$from}"

    for n in `seq $from $to`
    do
        echo ":: CMD -> " yarn cdown $dir/$n
        yarn cdown $dir/$n && bash ./comic/autoCout.sh $dir $n || return 1
    done

    echo 'AUTO CARTOON SUCCESS!!'
}


function autoCartoon_backup() {
    usage 2 ${#@} "bash autoCartoon.sh <dir> <from> [to]" || return 1
    bash ./comic/autoCdown.sh  $@ && bash ./comic/autoCout.sh $@
}

autoCartoon $@