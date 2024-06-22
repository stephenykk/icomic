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

function autoCdown() {
    usage 2 ${#@} "bash dm.sh <dir> <from> [to]" || return 1
    local dir="$1"
    local from="$2"
    local to="${3:-$from}"

    yarn d $dir $from $to || return 1
    yarn m $dir $from $to || return 1

}

autoCdown $@