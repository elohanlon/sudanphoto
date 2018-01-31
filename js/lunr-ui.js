$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var results_div = $('#results');
    var query = $(this).val();
    console.log(query);
    var results = index.search(query, {bool: "AND", expand: true});
    var sorted = [];
    for (var r in results){ // loop to sort results with online images to the front
      var ref = results[r].ref;
      var obj  = store[ref];
      if (obj.on_website == 'yes') {sorted.unshift(ref);}
      else {sorted.push(ref);}
    }
    results_div.empty();
    if (sorted.length > 10){results_div.prepend("<p><small>Displaying 10 of " + sorted.length + " results.</small></p>");}
    for (var s in sorted.slice(0, 9)) { // limit visible results to 10
      var idx   = sorted[s];
      var item  = store[idx];
      var link  = item.link;
      var title = item.title;
      var desc  = item.description;
      var date  = item._date;
      var coll  = item.collection;
      var meta  = desc + ' / ' + date + ' / ' + coll;
      if (item.on_website == 'yes') { meta = '&#127748; ' + meta;} // add image icon if image is online
      var result = '<div class="result"><b><a href="' + link + '">' + title + '</a></b><br><p>' + meta +'</p></div>';
      results_div.append(result);
    }
  });
});
