define([
	"Config.smartplan",
	"routers/AppRouter",
	"views/EndpointsView",
	"views/TryingView",
	"controllers/GroupsController",
	"controllers/ParamsController",
	"controllers/ErrorsController",
	"helpers/BackboneHelpers"
],function(Config, AppRouter, EndpointsView, TryingView, GroupsController, ParamsController, ErrorsController, BackboneHelpers) {

	window.APIBuddy = {

		router: null,

		initialize: function() {
			
			// Register Config globally, to make it easier to access 
			window.Config = Config;

			var self = this;
			$.ajax('../api/doc', {
				dataType: "json",
				cache: false,
				success: function(data, textStatus, jqXHR) {
					window.Config.groups = data.groups;
					self.start();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert("Erro ao carregar arquivo de configuração: " + jqXHR.status + "  " + jqXHR.statusText);
				}
			});
		},

		start: function() {

			// Register Config globally, to make it easier to access 
			window.Config = Config;

			// Parse config data
			GroupsController.parseGroups( Config.groups );
			ParamsController.parseGlobalParams( Config.globalParams );
			ErrorsController.parseGlobalErrors( Config.globalErrors );

			// Init views
			new TryingView();
			new EndpointsView().render();

			// Start history manager
			this.router = new AppRouter();
			Backbone.history.start();
		}

	};

	_.extend(APIBuddy, Backbone.Events);

	return APIBuddy;

});