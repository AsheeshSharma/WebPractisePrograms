	$(document).ready(function() {
	    $('body').on('input', 'input[name=keywordType]', _.debounce(function() {
	    	console.log('input event');
	      	$("#companyDiv").empty();
	      	if($(this).val().length != 0 ) {
	        	renderOutpu($("#inputKeyword").val());
    		}
	    },500));
	});

$('#myele').click(function () {});


$('#myele').on('click', function () {});

$('#parent').on('click', '#myele',  function () {});




	$(document).ready(function() {

	    $(document).keyup(function(e) {
	    	console.log('document keyup');
	        var $hlight = $('li.headList'),
	            $div = $('li');
	        if (e.keyCode == 40) { //down
	            $hlight.removeClass('headList').next().addClass('headList');
	            if ($hlight.next().length == 0) {
	                $div.eq(0).addClass('headList')
	            }
	        } else if (e.keyCode === 38) { //up
	            $hlight.removeClass('headList').prev().addClass('headList');
	            if ($hlight.prev().length == 0) {
	                $div.eq(-1).addClass('headList')
	            }
	        } else if(e.keyCode == 13){
	        	 alert($('li.headList').text());
	        	 $("#inputKeyword").val($('li.headList').text());
	        	 // window.location.replace("http://stackoverflow.com");

	        }
	    })
	});




	function renderOutpu(userInput) {
	    $.getJSON("http://etsearch.indiatimes.com/etspeeds/ethome.ep?callback=?&matchCompanyName=true&dvr=true&idr=true&mcx=true&mf=true&insideet=false&detail=true&forex=false&index=true&mecklai=true&pagesize=3&outputtype=json&ticker=" + userInput, function(data) {
	        var output = "<ul>";
	        var companyCount = 0;
	        var mutualFundCount = 0;
	        var commodityCount = 0;
	        var forexCount = 0;
	        var indexCount = 0;
	        var companyArray = [];
	        var mutualFundArray = [];
	        var forexArray = [];
	        var ccArray = [];
	        var indexArray = [];
	        var company = "<li class='headList' style='background-color:aliceblue;'><span>COMPANY</span></li>";
	        var mutual = "<li style='background-color:aliceblue;'><span>MUTAL FUND</span></li>";
	        var forex = "<li style='background-color:aliceblue;'><span>FOREX</span></li>";
	        var cc = "<li style='background-color:aliceblue;'><span>COMMODITY</span></li>";
	        var indexc = "<li style='background-color:aliceblue;'><span>INDICES</span></li>";

	        //MutualFund
	        //commodity
	        //forex
	        //index

	        $.each(data, function(index, val) {

	            if (mutualFundCount <= 4 && commodityCount <= 3 && forexCount <= 2 && indexCount <= 5 && companyCount <= 6) {
	                console.log(val.entityType);
	                switch (val.entityType) {
	                    case 'MutualFund':
	                        if (mutualFundCount < 4) {
	                            mutualFundArray.push(val.tagName);
	                            mutualFundCount++;
	                            console.log(mutualFundArray);
	                            mutual = mutual + "<li>" + val.tagName + "</li>"
	                        }
	                        break;
	                    case 'commodity':
	                        if (commodityCount < 3) {
	                            ccArray.push(val.tagName);
	                            commodityCount++;
	                            cc = cc + "<li>" + val.tagName + "</li>"
	                        }
	                        break;
	                    case 'forex':
	                        if (forexCount < 2) {
	                            forexArray.push(val.tagName);
	                            forexCount++;
	                            forex = forex + "<li>" + val.tagName + "</li>"
	                        }
	                        break;
	                    case 'index':
	                        if (indexCount < 5) {
	                            indexArray.push(val.tagName);
	                            indexCount++;

	                            indexc = indexc + "<li>" + val.tagName + "</li>"
	                        }
	                        break;
	                    case 'company':
	                        if (companyCount < 6) {
	                            companyArray.push(val.tagName);
	                            companyCount++;
	                            company = company + "<li>" + val.tagName + "</li>"
	                        }
	                        break;
	                }
	            } else {
	                return false;
	            }
	        });
	        // company = company + "</ul>"
	        // indexc = indexc + "</ul>"
	        // forex = forex + "</ul>"
	        // cc = cc + "</ul>"
	        // mutual = mutual + "</ul>"
	        if (companyCount == 0) {
	            company = "";
	        }
	        if (indexCount == 0) {
	            indexc = "";
	        }
	        if (forexCount == 0) {
	            forex = "";
	        }
	        if (commodityCount == 0) {
	            cc = "";
	        }
	        if (mutualFundCount == 0) {
	            mutual = "";
	        }
	        output = output + company + indexc + forex + cc + mutual;
	        output = output + "</ul>"
	        console.log(output)
	        $("#companyDiv").append(output);
	        // $("#forexDiv").append(forex);
	        // $("#commodityDiv").append(cc);
	        // $("#indexDiv").append(indexc);
	        // $("#mutualFundDiv").append(mutual);
	    });
	}