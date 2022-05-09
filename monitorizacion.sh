#!/bin/bash

ip=$1
option=$2

ssh root@$ip bash -c "'   
if [ "$option" = "memory" ]
then
  free
elif [ "$option" = "disc" ]
then
  df -h
elif [ "$option" = "process" ]
then
  ps aux
elif [ "$option" = "ip" ]
then
  ifconfig
elif [ "$option" = "users" ]
then
  who
elif [ "$option" = "ports" ]
then
  netstat -tplugn
elif [ "$option" = "portUdp" ]
then
  netstat -u
elif [ "$option" = "portTcp" ]
then
  netstat -t
elif [ "$option" = "tables" ]
then
  route -n
elif [ "$option" = "net" ]
then
  netstat -i
else
  echo "Opss: Verifique los parametros"
fi
'"