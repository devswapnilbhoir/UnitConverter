(function ($) {
    var methods = {

        uiDemo: function () {
            $("#refreshBtn").click(function () {
                methods.converterUI();
            });
            $("#MainHeading").append("<div id='TestDemo'></div>")
        },

        converterUI: function () {
            if ($("#converterBody")) {
                $("#converterBody").remove();
            }
            if ($("#SectionBody")) {
                $("#SectionBody").remove();
            }


            var converterBody = $("<div/>", {
                id: "converterBody",
                class: "form-group"
            }).append(
                $("<select/>", {
                    id: "conversionParam",
                    class: "form-control",
                }).append(
                    $("<option/>", {
                        text: "Length", value: "Length",
                    })
                ).append(
                    $("<option/>", {
                        text: "Tempreture", value: "Tempreture",
                    })
                ).append(
                    $("<option/>", {
                        text: "Speed", value: "Speed",
                    })
                ).change(function () {
                    methods.SectionBody();
                })
            );
            $("#MainPanel").append(converterBody);
            methods.selectionBody();
        },

        selectionBody: function () {
            if ($("#SectionBody")) {
                $("#SectionBody").remove();
            }
            var selectedConversionParam = $("#conversionParam")[0].value;
            switch (selectedConversionParam) {
                case "Length":
                    $("#MainPanel").append(methods.SectionBody());
                    break;
            }
        },

        UnitBody: function () {
            var selectedConversionParam = $("#conversionParam")[0].value;

            var selectListForUnits = $("<select/>", {
                id: "ddUnits",
                class: "clUnits form-control",
                css: { "width": "auto" }
            }).change(
                function () {
                    methods.ConversionComparision();
                }
            );

            var UnitsOptions = [];

            if (selectedConversionParam == "Length") {
                UnitsOptions = [
                    { text: "cm", value: "cm" },
                    { text: "mm", value: "mm" },
                    { text: "m", value: "m" },
                    { text: "km", value: "km" },
                    { text: "mc", value: "mc" },
                    { text: "nm", value: "nm" },
                    { text: "mile", value: "mile" },
                    { text: "yard", value: "yard" },
                    { text: "foot", value: "foot" },
                    { text: "inch", value: "inch" },
                    { text: "ncm", value: "ncm" },
                ]

            }

            if (selectedConversionParam == "Tempreture") {
                UnitsOptions = [
                    { text: "Celsius", value: "cl" },
                    { text: "Fahrenheit", value: "ft" },
                    { text: "Kelvin", value: "kl" },
                ]
            }

            if (selectedConversionParam == "Speed") {
                UnitsOptions = [
                    { text: "Miles per hour", value: "MPH" },
                    { text: "Foot per second", value: "FPS" },
                    { text: "Metre per second", value: "MPS" },
                    { text: "Kilometre per hour", value: "KPH" },
                    { text: "Knot", value: "knot" },
                ]
            }

            if (UnitsOptions != undefined && UnitsOptions != null && UnitsOptions.length > 0)
                for (var i = 0; i < UnitsOptions.length; i++) {
                    var lengthUnitRow = $("<option/>", {
                        text: UnitsOptions[i].text,
                        value: UnitsOptions[i].value
                    });

                    selectListForUnits.append(lengthUnitRow);
                }

            return selectListForUnits;
        },

        SectionBody: function () {
            if ($("#SectionBody")) {
                $("#SectionBody").remove();
            }
            var SectionBodyHtml = $("<div/>", {
                id: "SectionBody",
                class: "row",
                css: { "margin-left": "20px", "margin-right": "20px" }
            }).append(
                $("<div/>", {
                    class: "form-control col-md-5"
                }).append(
                    $("<div/>").append(
                        $("<input />", {
                            id: "inputValue",
                            class: "form-control",
                            placeholder: "Enter Value",
                            type: "number",
                        }).keyup(
                            function () {
                                methods.ConversionComparision();
                            }
                        )
                    )
                ).append(
                    $("<div/>").append(
                        methods.UnitBody()
                    )
                )
            ).append(
                $("<div/>", {
                    class: "col-md-2",
                    css: { "text-align": "center", "padding-top": "26px", "font-size": "35px" }
                }).html("=")
            ).append(
                $("<div/>", {
                    class: "form-control col-md-5"
                }).append(
                    $("<div/>").append(
                        $("<input />", {
                            id: "outputValue",
                            class: "form-control",
                            placeholder: "0",
                            type: "number",
                            readonly: "true"
                        })
                    )
                ).append(
                    $("<div/>").append(
                        methods.UnitBody()
                    )
                )
            );
            $("#MainPanel").append(SectionBodyHtml);
            return SectionBodyHtml;
        },

        ConversionComparision: function () {
            if ($("#inputValue")[0].value != undefined && $("#inputValue")[0].value.trim() != "") {

                var selectedConversionParam = $("#conversionParam")[0].value;

                switch (selectedConversionParam) {
                    case "Length":
                        methods.lengthConversionComparision();
                        break;
                    case "Tempreture":
                        methods.tempretureConversionComparision();
                        break;
                        case "Speed":
                        methods.speedConversionComparision();
                        break;
                }
            }
            else {
                $("#outputValue")[0].value = "0";
            }
        },

        lengthConversionComparision: function () {
            var inputValue = parseInt($("#inputValue")[0].value);
            var inputUnit = $(".clUnits")[0].value;
            var outputUnit = $(".clUnits")[1].value;
            var outputValue = "";

            if (inputUnit.trim() == "cm") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 10).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 100).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 100000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 10000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 10000000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 160934.4).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue / 91.44).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue / 30.48).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue / 2.54).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 185200).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "m") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 100).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 1000).toString();
                        break;

                    case "m":
                        outputValue = (inputValue).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 1000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 1000000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 1000000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 1609.344).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue * 1.094).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue * 3.281
                        ).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue * 39.37).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 1852).toString();
                        break;

                }
            }

            if (inputUnit.trim() == "km") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 100000).toString();
                        break;

                    case "m":
                        outputValue = (inputValue * 1000).toString();
                        break;

                    case "km":
                        outputValue = (inputValue).toString();
                        break;
                    case "mm":
                        outputValue = (inputValue * 1000000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 1000000000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 1000000000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 1.609).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue * 1093.613).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue * 3280.84).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue * 39370.079).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 1.852).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "mm") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue / 10).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 1000).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 1000000).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 1000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 1000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 1.609000000).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue / 914.4).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue / 304.8).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue / 25.4).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 1.852000000).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "mc") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue / 10000).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 1000000).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 1000000000).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue / 1000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 1000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 1.609000000000).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue / 914400).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue / 304800).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue / 25400).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 1.852000000000).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "nm") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue / 10000000).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 1000000000).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 1000000000000).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue / 1000000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue / 1000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 1.609000000000000).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue / 9.14400000000).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue / 3.04800000000).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue / 2.540000000).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 1.852000000000000).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "mile") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 160934.4).toString();
                        break;

                    case "m":
                        outputValue = (inputValue * 1609.344).toString();
                        break;

                    case "km":
                        outputValue = (inputValue * 1.609).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 1.609000000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 1.609000000000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 1.609000000000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue * 1760).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue * 5280).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue * 63360).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 1.151).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "yard") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 91.44).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 1.094).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 1093.613).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 914.4).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 914400).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 9.14400000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 1760).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue * 3).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue * 36).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 2025.372).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "foot") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 30.48).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 3.281).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 3280.84).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 304.8).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 304800).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 3.04800000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 5280).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue / 3).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue * 12).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 6076.115).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "inch") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 2.54).toString();
                        break;

                    case "m":
                        outputValue = (inputValue / 39.37).toString();
                        break;

                    case "km":
                        outputValue = (inputValue / 39370.079).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 25.4).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 25400).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 2.540000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue / 63360).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue / 36).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue / 12).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue / 72913.386).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "ncm") {
                switch (outputUnit) {
                    case "cm":
                        outputValue = (inputValue * 185200).toString();
                        break;

                    case "m":
                        outputValue = (inputValue * 1852).toString();
                        break;

                    case "km":
                        outputValue = (inputValue * 1.852).toString();
                        break;

                    case "mm":
                        outputValue = (inputValue * 1.852000000).toString();
                        break;

                    case "mc":
                        outputValue = (inputValue * 1.852000000000).toString();
                        break;

                    case "nm":
                        outputValue = (inputValue * 1.852000000000).toString();
                        break;

                    case "mile":
                        outputValue = (inputValue * 1.151).toString();
                        break;

                    case "yard":
                        outputValue = (inputValue * 2025.372).toString();
                        break;

                    case "foot":
                        outputValue = (inputValue * 6076.115).toString();
                        break;

                    case "inch":
                        outputValue = (inputValue * 72913.386).toString();
                        break;

                    case "ncm":
                        outputValue = (inputValue).toString();
                        break;
                }
            }

            $("#outputValue")[0].value = outputValue.toString();

        },

        tempretureConversionComparision: function () {
            var inputValue = parseInt($("#inputValue")[0].value);
            var inputUnit = $(".clUnits")[0].value;
            var outputUnit = $(".clUnits")[1].value;
            var outputValue = "";

            if (inputUnit.trim() == "cl") {
                switch (outputUnit) {
                    case "cl":
                        outputValue = (inputValue).toString();
                        break;
                    case "ft":
                        outputValue = ((inputValue * (9 / 5) + 32)).toString();
                        break;
                    case "kl":
                        outputValue = (inputValue + 273.15).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "ft") {
                switch (outputUnit) {
                    case "cl":
                        outputValue = ((inputValue - 32) * (5 / 9)).toString();
                        break;
                    case "ft":
                        outputValue = (inputValue).toString();
                        break;
                    case "kl":
                        outputValue = (((inputValue - 32) * (5 / 9)) + 273.15).toString();
                        break;
                }
            }

            if (inputUnit.trim() == "kl") {
                switch (outputUnit) {
                    case "cl":
                        outputValue = (inputValue - 273.15).toString();
                        break;
                    case "ft":
                        outputValue = (((inputValue - 273.15) * (9 / 5) + 32)).toString();
                        break;
                    case "kl":
                        outputValue = (inputValue).toString();
                        break;
                }
            }

            $("#outputValue")[0].value = outputValue.toString();
        },

        speedConversionComparision: function () {
            var inputValue = parseInt($("#inputValue")[0].value);
            var inputUnit = $(".clUnits")[0].value;
            var outputUnit = $(".clUnits")[1].value;
            var outputValue = "";

            if (inputUnit == "MPH") {
                switch (outputUnit) {
                    case "MPH":
                        outputValue = inputValue.toString();
                        break;

                    case "FPS":
                        outputValue = (inputValue * 1.467).toString();
                        break;

                    case "MPS":
                        outputValue = (inputValue / 2.237).toString();
                        break;

                    case "KPH":
                        outputValue = (inputValue * 1.609).toString();
                        break;

                    case "knot":
                        outputValue = (inputValue / 1.151).toString();
                        break;

                }
            }

            if (inputUnit == "FPS") {
                switch (outputUnit) {
                    case "MPH":
                        outputValue = (inputValue / 1.467).toString();
                        break;

                    case "FPS":
                        outputValue = (inputValue).toString();
                        break;

                    case "MPS":
                        outputValue = (inputValue / 3.281).toString();
                        break;

                    case "KPH":
                        outputValue = (inputValue * 1.097).toString();
                        break;

                    case "knot":
                        outputValue = (inputValue / 1.688).toString();
                        break;

                }
            }

            if (inputUnit == "MPS") {
                switch (outputUnit) {
                    case "MPH":
                        outputValue = (inputValue * 2.237).toString();
                        break;

                    case "FPS":
                        outputValue = (inputValue * 3.281).toString();
                        break;

                    case "MPS":
                        outputValue = (inputValue).toString();
                        break;

                    case "KPH":
                        outputValue = (inputValue * 3.6).toString();
                        break;

                    case "knot":
                        outputValue = (inputValue * 1.944).toString();
                        break;

                }
            }

            if (inputUnit == "KPH") {
                switch (outputUnit) {
                    case "MPH":
                        outputValue = (inputValue / 1.609).toString();
                        break;

                    case "FPS":
                        outputValue = (inputValue / 1.097).toString();
                        break;

                    case "MPS":
                        outputValue = (inputValue / 3.6).toString();
                        break;

                    case "KPH":
                        outputValue = (inputValue).toString();
                        break;

                    case "knot":
                        outputValue = (inputValue / 1.852).toString();
                        break;

                }
            }

            if (inputUnit == "knot") {
                switch (outputUnit) {
                    case "MPH":
                        outputValue = (inputValue * 1.151).toString();
                        break;

                    case "FPS":
                        outputValue = (inputValue * 1.688).toString();
                        break;

                    case "MPS":
                        outputValue = (inputValue / 1.944).toString();
                        break;

                    case "KPH":
                        outputValue = (inputValue * 1.852).toString();
                        break;

                    case "knot":
                        outputValue = (inputValue).toString();
                        break;

                }
            }


            $("#outputValue")[0].value = outputValue.toString();
        }


    }


    $.fn.hello = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.uiDemo.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.Editor');
        }
        //  return methods.test.apply(options);
    }
}(jQuery));