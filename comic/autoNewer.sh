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

function autoNewer() {
    usage 0 ${#@} "bash autoNewer.sh" || return 1
    
    # yarn clist
    # sleep 5

    for dirName in `cat ./output/fav.txt`
    # for dirName in `cat ./output/fav.tmp`
    do
        echo yarn newer $dirName
        # yarn newer $dirName || return 1
        yarn newer $dirName
        if [ "$?" -gt 0 ]; then
            echo "~~~~~CHECK $dirName NEWER FAIL~~~~~~"
        else
            echo "~~~~~CHECK $dirName NEWER SUCCESS~~~~~~"
        fi

        echo -e "\n\n"

    done

    sleep 2
    echo '------------------------ newer list -----------------'
    yarn newerList
}

autoNewer $@
