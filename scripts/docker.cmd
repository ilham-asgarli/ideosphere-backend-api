set /p "name=Image name: "
if not [%name%]==[] (
docker build -t %name% .
)

set /p "port1=Port 1: "
if [%port1%]==[] (
set port1=3000
)

set /p "port2=Port 2: "
if [%port2%]==[] (
set port2=3000
)

docker run -p %port1%:%port2% %name%