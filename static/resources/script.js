$(document).ready(function () {
    const markers = getSentiments().then(res => {
        res.data.points.map(coords => {
            const coordObj = {lat: coords[1], lng: coords[0]};
            const marker = new google.maps.Marker({
                position: coordObj,
                map,
                animation: google.maps.Animation.DROP,
            });
            marker.addListener('click', () => handleClickMarker(marker, coords.toLocaleString()));
            return marker;
        });
        const point = res.data.points[0];
        map.setCenter(new google.maps.LatLng(point[1], point[0]));
    });

    const handleClickMarker = (marker, id) => {
        if (marker.getAnimation() === null) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 2100);
        }
        getSentiment(id).then(res => {
            const data = res.data;
            const count = data.messages.length;
            $('#social-message').html(count + ' Social Message' + (count > 1 ? 's' : ''));
            if (count === 0) return;
            $('#list-wrapper').html(data.messages.sort((m1, m2) => m1.cat < m2.cat ? 1 : m1.cat === m2.cat ? 0 : -1).map(m => {
                const poster = "<div class='user-name'>" + m.userName + "</div>";
                const date = "<div class='date'>" + new Date(convertDateTime(m.date, false)).toLocaleString() + "</div>";
                const message = "<div class='mark-text'>" + convertString(m.text) + "</div>";
                const sentiStrings = m.sentiStrings === '' ? '' : "<div class='senti'>" + convertString(m.sentiStrings) + "</div>";
                const content = "<div class='card-body'><img src='resources/img/" + m.source + ".png' class='icon'/>" +
                    "<div class='card-content'>" + poster + date + message + sentiStrings + "</div>" +
                    "<div class='tag " + (m.cat === 0 ? 'tag-neg' : m.cat === 1 ? 'tag-neu' : 'tag-pos') + "'>" +
                    (m.cat === 0 ? 'Negative' : m.cat === 1 ? 'Neutral' : 'Positive') +
                    "</div>"
                "</div>";
                return "<li class='list-group-item card'>" + content + "</li>"
            })).markRegExp(/([@]|[#])([a-z])\w+/gmi);
        });
        $('#viewer').modal({show: true});
    };

    $('body').find('.mark-text')

    const convertDateTime = (dateValue, isDateOnly) => {
        const date = new Date(dateValue);
        date.setSeconds(0, 0);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const dateString = (new Date(date.getTime() - tzOffset)).toISOString();
        if (isDateOnly) return dateString.split('T')[0];
        return dateString.split(':00.000Z')[0];
    };

    const convertString = (str) => {
        return urlify(str.replace('\n', '<br />'));
    };

    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        })
    }

    $('.icon-wrapper:not(.map)').click(() => {
        history.pushState({}, '', window.location.href + "/charts");
        $('.icon-wrapper:not(.map)').hide();
        $('.icon-wrapper.map').removeClass('d-none');
        $('#map').addClass('d-none');
        $('#chart').removeClass('d-none');
        initDonut();
    });
    $('.icon-wrapper.map').click(() => {
        history.back();
        $('.icon-wrapper:not(.map)').show();
        $('.icon-wrapper.map').addClass('d-none');
        $('#map').removeClass('d-none');
        $('#chart').addClass('d-none');
        $('#chart-wrapper').html('');
    });

    const initDonut = () => {
        const colors = d3.scaleOrdinal()
            .range(['#FF7043', '#26A69A', '#FFEE58']);

        const arc = d3.arc()
            .outerRadius(200)
            .innerRadius(100);

        const labelArc = d3.arc()
            .outerRadius(200)
            .innerRadius(200);

        const pie = d3.pie()
            .sort((d1, d2) => d1.count < d2.count ? 1 : d1.count === d2.count ? 0 : -1)
            .value((d) => d.count);

        const svg = d3.select('#chart-wrapper').append('svg')
            .attr('width', 500)
            .attr('height', 500)
            .append('g')
            .attr('id', 'donut-chart')
            .attr('transform', 'translate(250, 250)');

        getDonutData().then(res => {
            const map = Object.keys(res.data).map(s => ({
                sentiment: s,
                count: res.data[s],
            }));
            var g = svg.selectAll('.arc')
                .data(pie(map))
                .enter()
                .append('g')
                .attr('class', 'arc');

            g.append('path')
                .attr('d', arc)
                .style('fill', (d) => colors(d.data.sentiment))
                .transition()
                .ease(d3.easeLinear)
                .duration(1000)
                .attrTween('d', pieTween);

            g.append('text')
                .attr('transform', (d) => 'translate(' + labelArc.centroid(d) + ')')
                // .attr('dy', '.35em')
                .text((d) => d.data.sentiment + ' (' + addThousandSeparator(d.data.count) + ')');
        });

        const addThousandSeparator = (nStr) => {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }

        const pieTween = (b) => {
            b.innerRadius = 0;
            var i = d3.interpolate({
                startAngle: 0,
                endAngle: 0,
            }, b);
            return (t) => arc(i(t));
        }
    };
});