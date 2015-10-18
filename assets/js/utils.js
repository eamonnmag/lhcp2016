/**
 * Created by eamonnmaguire on 18/10/15.
 */

var utils = (function () {

    var templates = {"sidebar_nav": "assets/templates/sidebar-menu.hbs", "main_nav": "assets/templates/main-menu.hbs"};


    var get_menu_items = function (active_item) {
        var menu_items = [
            {"url": "/registration.html", "name": "Registration", "class": ""},
            {"url": "/committees.html", "name": "Committees", "class": ""},
            {
                "url": "/conference_information.html",
                "name": "Conference Information",
                "dropdown_id": "conf_dropdown",
                "class": "",
                "items": [
                    {"url": "/conference_information/visa.html", "name": "Visa", "class": "sublink"},
                    {"url": "/conference_information/accommodation.html", "name": "Accommodation", "class": "sublink"},
                    {"url": "/conference_information/attendees.html", "name": "Attendees", "class": "sublink"},
                    {
                        "url": "/conference_information/social_program.html",
                        "name": "Social Program",
                        "class": "sublink"
                    },
                    {"url": "/conference_information/things_to_do.html", "name": "Things to do", "class": "sublink"},
                    {"url": "/conference_information/weather.html", "name": "Weather", "class": "sublink"},
                    {"url": "/conference_information/disclaimer.html", "name": "Disclaimer", "class": "sublink"}]
            },
            {"url": "/agenda.html", "name": "Agenda", "class": ""},
            {"url": "/sponsors.html", "name": "Sponsors", "class": ""},
            {"url": "/contact.html", "name": "Contact Us", "class": ""}
        ];

        var dropdowns = [];
        for (var menu_item in menu_items) {
            var menuItem = menu_items[menu_item];

            if (active_item == menuItem.name) {
                menuItem.class += " active";
            }

            if (menuItem.items) {
                dropdowns.push({"dropdown_id":menuItem.dropdown_id, "items": menuItem.items});
            }
        }

        return {"menu": menu_items, "dropdowns": dropdowns};
    };


    return {
        render_sidebar_menu: function (position, active) {

            $.get(templates["sidebar_nav"], function (data) {
                var template= Handlebars.compile(data);
                var html = template(get_menu_items(active));

                console.log(html);
                console.log(position);

                $(position).append(html);

                $(".button-collapse").sideNav();

            }, 'html');
        },

        render_menu: function (position, active) {

            $.get(templates["main_nav"], function (data) {
                var template= Handlebars.compile(data);
                var html = template(get_menu_items(active));

                $(position).append(html);

                $('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        hover: true, // Activate on hover
                        gutter: 0, // Spacing from edge
                        belowOrigin: true, // Displays dropdown below the button
                        alignment: 'left' // Displays dropdown with edge aligned to the left of button
                    }
                );


            }, 'html');

        }
    }

})();