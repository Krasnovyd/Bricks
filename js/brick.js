(function(){
	"use strict";

	function Brick(container, options){
		this.elem;
		this.container = container;
		this.update(options);
		this.facetPX = this.facet * 37.7 + "px";
		this.borderWidthPX = this.borderWidth * 3.77 + "px";
		this.active = false;
		this.create();
	};

	Brick.prototype.create = function(){
		this.elem = document.createElement("DIV");
		this.elem.innerHTML = this.text;
		this.elem.className = "brick obstacle";
		this.elem.style.width = this.facetPX;
		this.elem.style.height = this.facetPX;
		this.elem.style.borderWidth = this.borderWidthPX;
		this.elem.style.backgroundColor = this.backgroundColor;
		this.elem.style.borderColor = this.borderColor;
		this.container.appendChild(this.elem);
	};

	Brick.prototype.remove = function(){
		this.container.removeChild(this.elem);
	};

	Brick.prototype.update = function(options){
		for(var key in options){
			this[key] = options[key];
		}
	};

	Brick.prototype.edit = function(options){
		this.update(options);
		this.facetPX = this.facet * 37.7 + "px";
		this.borderWidthPX = this.borderWidth * 3.77 + "px";
		this.elem.innerHTML = this.text;
		this.elem.style.width = this.facetPX;
		this.elem.style.height = this.facetPX;
		this.elem.style.borderWidth = this.borderWidthPX;
		this.elem.style.backgroundColor = this.backgroundColor;
		this.elem.style.borderColor = this.borderColor;
	};

	window.Brick = Brick;
})();