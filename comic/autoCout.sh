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

function autoCout() {
    usage 2 ${#@} "bash autoCout.sh <dir> <from> [to]" || return 1
    local dir="$1"
    local from="$2"
    local to="${3:-$from}"
    for n in `seq $from $to`
    do

        if [ -d "cartoon/$dir/$n/dec" ]
        then
            if [ -f "cartoon/$dir/$n/dec"/*mp4 ]
            then
                echo ":: mp4 exists already"
                ls -lh "cartoon/$dir/$n/dec"/*mp4
            else
                echo ":: CMD -> " yarn cout $dir/$n/dec
                yarn cout $dir/$n/dec
            fi
        else
            if [ -f "cartoon/$dir/$n"/*mp4 ]
            then
                echo ":: mp4 exists already"
                ls -lh "cartoon/$dir/$n"/*mp4
            else
                echo ":: CMD -> " yarn cout $dir/$n
                yarn cout $dir/$n
            fi
        fi
    done
}

autoCout $@