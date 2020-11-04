build:
	docker build -t happy_shop_ui .

start:
	docker run --publish 3000:3000 -v ${PWD}:/app --name happy_shop happy_shop_ui

start_no_mount:
	docker run --publish 3000:3000 --name happy_shop happy_shop_ui
