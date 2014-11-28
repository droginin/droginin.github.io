$('#sl2').slider().on('slide', function(ev){
    $("#currentPriceLow").val(ev.value[0]);
    $("#currentPriceHigh").val(ev.value[1]);
});
$('#datetimepicker2').datetimepicker();
$("#dataError").hide();

var refreshTime = function () {
    var currentDate = new Date();
    var minutes = currentDate.getMinutes();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    var currentTime = currentDate.getHours() + ":" + minutes;
    $(".current-time").find("span").text(currentTime);
    setTimeout(refreshTime, 1000);
};

var loadJSONData = function(filename) {
    var jsonFilePath;
    var templateID;
    if (filename == null) {
        jsonFilePath = 'assets/json/featured-products.json';
        templateID = "#data-main-template";
    } else {
        jsonFilePath = 'assets/json/' + filename;
        templateID = "#data-search-template";
    }

    $.getJSON(jsonFilePath , function(data) {
        var template = Handlebars.compile($(templateID).html());
        $("#items").append(template(data.items));
        $("#dataError").hide();
    }).fail(function() {
        $("#dataError").show();
    });

    if (templateID == "#data-search-template"){
        refreshTime();
    };
};

loadJSONData();

var submitSearch = function(ev){
    $("#items").find("li").remove();
    $("#breadcrumb").find("li").remove();
    $("#breadcrumb").append(
            '<li><a id="homeLink" href="#">Home</a></li>'+
            '<li class="active">Search results</li>');
    $("#homeLink").click(homePage);
    $("#rowbreadcrumb").show();
    $("#featured-product-carousel").hide();
    $("#searchForm").hide();
    $("#custom-search").show();
    ev.preventDefault();

    loadJSONData("search-results.json");
};

var homePage = function(){
    $("#featured-product-carousel").show();
    $("#searchForm").show();
    $("#custom-search").hide();
    $("#rowbreadcrumb").hide();
    $("#items").find("li").remove();

    loadJSONData();
};

$("#searchForm").submit(submitSearch);
$("#customSearchForm").submit(submitSearch);
$(".home-link").click(homePage);
$(".search-link").click(submitSearch);