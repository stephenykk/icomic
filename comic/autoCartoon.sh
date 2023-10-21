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
    usage 3 ${#@} "bash autoCartoon.sh <dir> <from> <to>" || return 1
    bash ./autoCdown.sh  $@ && bash ./autoCout.sh $@
}

autoCartoon $@