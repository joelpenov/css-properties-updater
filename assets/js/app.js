
(function(){
	var inputs = [
		{
			label: "Spacing: ",
			target: "imagePosition",
			targetUnit: "px",
			attributes: [{name: "min", value: -300}, {name: "max", value: 300}, {name: "type", value: "range"}]
		},
		{
			label: "Blur: ",
			target: "blurIntensity",
			targetUnit: "px",
			attributes: [{name: "min", value: 0}, {name: "max", value: 10}, {name: "type", value: "range"}]
		},
		{
			label: "Base color: ",
			target: "baseColor",
			attributes: [{name: "type", value: "color"}]
		}
	];

	function Controller(view){
		var self = this;

		self.init = function(){
			view.init(inputs);
		};


	}

	function View(){
		var self = this;

		self.controlsArea = document.getElementById("controlsArea");
		self.inputTemplate = document.getElementById("input-template");

		self.init = function(inputs){
			self.renderInputs(inputs);
			self.setElementEvents(inputs);
		};

		self.renderInputs = function(inputs){
			var template = self.inputTemplate.innerHTML;
			self.controlsArea.innerHTML = "";
			inputs.forEach(function(input){
				var currentEntry = template.replace("{{label}}", input.label)
				.replace("{{attributes}}",  self.getAttributes(input))
				.replace("{{identifier}}",self.getElementIdByLabel(input.label));
				self.controlsArea.innerHTML += currentEntry;
			});
		}

		self.setElementEvents = function(inputs){
			inputs.forEach(function(input){
				var element = document.getElementById(self.getElementIdByLabel(input.label));
				element.addEventListener("change", function(){self.updateProperty(input)});
				element.addEventListener("mousemove", function(){self.updateProperty(input)});
			});
		};

		self.updateProperty = function(input){
			var element = document.getElementById(self.getElementIdByLabel(input.label));
			var newValue = element.value + (input.targetUnit !== undefined ? input.targetUnit : "");
			document.documentElement.style.setProperty("--" + input.target, newValue);
		};

		self.getElementIdByLabel = function(label){
			return label.replace(/ /g, "").replace(/:/g,"");
		}

		self.getAttributes = function(input){
			var result = "";
			input.attributes.forEach(function(attribute){
				result += attribute.name + "='" + attribute.value +"' " ;
			});

			return result;
		};
	}

	document.addEventListener('DOMContentLoaded', function() {
		var controller = new Controller(new View());
		controller.init();
	});
})();