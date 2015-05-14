(function(){
	"use strict";

	window.onload = function(){
		var createBrick = document.getElementById("createBrick"),
			saveBrick = document.getElementById("saveBrick"),
			deleteBrick = document.getElementById("deleteBrick"),
			bricksList = document.getElementById("bricks"),
			bricksContainer = document.getElementById("bricksZone"),
			editor = document.getElementById("editor").getElementsByTagName("INPUT"),
			activeBrick, bricks = [], editorValues = [],
			regExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

		function validate(){
			for(var i = 0; i < editor.length - 1; i++){
				if(editor[i].type === "number"){
					if(1 > +editor[i].value || +editor[i].value > 20){
						alert("Введите корректные данные");
						return false;
					}
				} else if(editor[i].type === "text"){
					if(!regExp.test(editor[i].value)){
						alert("Введите корректные данные");
						return false;
					}
				}

				editorValues.push(editor[i].value);
			}

			return true;
		};

		function showEditor(){
			if(activeBrick){
				for(var i = 0; i < editor.length; i++){
					editor[i].value = activeBrick[editor[i].id];
				}
			}
		};

		createBrick.addEventListener("click", function(){
			var brick, brickElem;

			if(!validate()){
				return;
			}

			brick = new Brick(bricksContainer, {
				facet: editorValues[0],
				backgroundColor: editorValues[1],
				borderWidth: editorValues[2],
				borderColor: editorValues[3],
				text: editor[4].value
			});

			bricks.push(brick);

			brickElem = document.createElement("LI"),
			brickElem.innerHTML = brick.text;
			bricksList.appendChild(brickElem);

			brickElem.addEventListener("click", function(){

				if(activeBrick){
					activeBrick.elem.classList.remove("active");
					activeBrick.elem.classList.add("obstacle");
					activeBrick.inList.classList.remove("active");
				}

				brickElem.classList.add("active");
				brick.elem.classList.add("active");
				brick.elem.classList.remove("obstacle");
				brick.inList = brickElem;
				activeBrick = brick;
				showEditor();

				$("#bricksZone div.active").draggable({
					obstacle: "#bricksZone .obstacle",
					preventCollision: true,
					containment: "#bricksZone"
				});
			});

			editorValues = [];
		});

		deleteBrick.addEventListener("click", function(){
			if(activeBrick){
				bricksList.removeChild(activeBrick.inList);
				bricks.splice(activeBrick, 1);
				activeBrick.remove();
				activeBrick = null;
			}
		});

		saveBrick.addEventListener("click", function(){
			if(activeBrick){
				if(!validate()){
					return;
				}

				activeBrick.edit({
					facet: editorValues[0],
					backgroundColor: editorValues[1],
					borderWidth: editorValues[2],
					borderColor: editorValues[3],
					text: editor[4].value
				});

				editorValues = [];
			}
		});
	};
})();