function showPrices(returnObj) {
    'use strict';
    var products = returnObj.products,
        currency = returnObj.currency,
        country = returnObj.country,
        vat = returnObj.vat,
        srpname = returnObj.srpname,
        srpnameshort = returnObj.srpnameshort,
        itemId = null,
        priceDiv = null,
        nocolors = true,
        selector,

        i ,n ;

    if (!srpname || !currency || products.length == 0) {
        return;
    }

    for (i = 0; i < products.length; i++)
    {
        for (n = 0; n < products[i].colorvariations.length; n++)
        {
            if (n > 0 & products[i].colorvariations[n].name !== '') {
                nocolors = false;
                break;
            }
        }
        itemId = products[i].itemId;
        priceDiv = $('#d' + itemId + '.product-lineup-full-width');
        var showDetail = (0 < priceDiv.length)
        if (! showDetail ) {
            priceDiv = $('#media-images-for-slider-full-width-' + itemId + '.product-lineup-full-width');
            showDetail = (0 < priceDiv.length)
        }
        if (showDetail) {
            showPriceDetailpage(products[i], priceDiv, srpname, currency, nocolors);
            continue;
        }
        priceDiv = $("div[data-id='" + itemId + "']");
        if (0 < priceDiv.length) {
            showPriceListpage(products[i], priceDiv, srpnameshort, currency, nocolors);
        }
    }
}

function showPriceListpage(product, priceDiv,srpname,currency,nocolors) {
    var n,
        currentElement,
        colorvariations = product.colorvariations,
        colorname = '',
        calculatedprice = null,
        format = '',
        htmlCode = '';

    console.log('ListPage (price)');
    currentElement = priceDiv.find('h3');
    if (product.calculatedpricemin > 0 && product.calculatedpricemax > 0) {
      currentElement = $('<span style="font-weight: bold">{srpname}: </span>'.formatUnicorn(
        {srpname: srpname})).insertAfter(currentElement);
    }

    if (product.display && product.display.length > 0 && product.display) {
        format = '<span style="font-weight: bold">{display}</span>';
      //  currentElement = $(format.formatUnicorn({display:product.display})).insertAfter(currentElement);
        return;
    }

    format = '<span style="font-weight: bold">{pricemin} {currency}</span>';

    if (!nocolors && product.calculatedpricemax != product.calculatedpricemin) {
        format = '<span style="font-weight: bold">{pricemin} {currency} &ndash; {pricemax} {currency} </span>';
    }

    htmlCode = format.formatUnicorn({colorname:colorname, pricemin:product.calculatedpricemin, pricemax:product.calculatedpricemax, currency: currency});
    currentElement = $(htmlCode).insertAfter(currentElement);
}


function showPriceDetailpage(product, priceDiv, srpname, currency, nocolors)
{
    var n,
    currentElement,
    colorvariations = product.colorvariations,
    colorname = '',
    calculatedprice = null,
    format = '',
    htmlCode = '';

    console.log('DetailPage (price)');
    currentElement = priceDiv.find('h3');
    if (product.display && product.display.length > 0) {
        format = '<span style="font-weight: bold">{display}</span>';
        currentElement = $(format.formatUnicorn({display:product.display})).insertAfter(currentElement);
        return;
    }
    currentElement = $('<span style="font-weight: bold">{srpname}: </span>'.formatUnicorn( {srpname: srpname})).insertAfter(currentElement);
    format = '<span style="font-weight: bold">{price} {currency}</span>';
    if (!nocolors) {
        currentElement = $('<table class="table"><tbody>').insertAfter(currentElement);
        format = '<tr><th scope="row" style="font-weight: bold"><span class="text-muted">{colorname}&nbsp;</span></th><td style="font-weight: bold">{price} {currency}</td></tr>';
    }

    for (n = 0; n < colorvariations.length; n++) {
        if (n > 0 && nocolors) {
            break;
        }
        calculatedprice = colorvariations[n].calculatedprice;
        colorname = colorvariations[n].name;
        if (calculatedprice) {
            htmlCode = format.formatUnicorn({colorname:colorname, price:calculatedprice, currency: currency});
            currentElement = $(htmlCode).insertAfter(currentElement);
        }
    }
    if (!nocolors) {
        currentElement = $("</tbody></table><p></p>").insertAfter(currentElement);
    }
    currentElement = $("<p></p>").insertAfter(currentElement);
}


function getSrp(publicationId, itemIds) {
    'use strict';
    var dataSet = {
        'publicationid': publicationId,
        'itemids': itemIds,
        'key': '863402c325d9c58996302119eeab15d9'
    };
    $.ajax({
        type: 'GET',
        url: 'https://www.yamaha-extranet.com/api/srp',
        // url: 'http://b2bproxy/api/srp',
        data: dataSet,
        dataType: 'json',
        success: function (data) {
            showPrices(data);
        },
        failure: function (errMsg) {
            console.info('could not retrieve price information: ' + errMsg);
        }
    });
}

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {

        "use strict";

        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };

$(document).ready(function () {

    'use strict';

    var lineup = null,
        publicationId = null,
        itemIds = Array(),
        i = 0,
        container = null;

    if ('object' !== typeof (dataLayer)
        || !Array.isArray(dataLayer)
        || 1 > dataLayer.length
        || !dataLayer[0].hasOwnProperty('TcmId')
    ) {
        return false;
    }

    publicationId = dataLayer[0].TcmId.substring(0, 2);

    if ('object' !== typeof (tcmObj)

        || (!tcmObj.hasOwnProperty('lineup') || 1 > tcmObj.lineup.length)
        && (!tcmObj.hasOwnProperty('childProducts') || 1 >
            tcmObj.childProducts.length)
    ) {
        return false;
    }
    container = tcmObj.lineup || tcmObj.childProducts;
    lineup = (Array.isArray(container) ? container : Array(container));
    if (!lineup[0].hasOwnProperty('id')) {
        return false;
    }
    for (i = 0; i < lineup.length; i++) {
        itemIds[i] = lineup[i].id;
    }
    getSrp(publicationId, itemIds);
});
