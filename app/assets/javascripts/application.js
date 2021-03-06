// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.

// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require fastclick/fastclick
//= require best_in_place
//= require holder
//= require jquery.validate
//= require jquery.validate.additional-methods
//= require moment/moment.min
//= require jquery-touchswipe/jquery.touchSwipe.min
//= require semantic_ui/semantic_ui
//= require_tree .
//= require maskedinput

$(document).on('ready page:load',function() {
  FastClick.attach(document.body);
  /* Activating Best In Place */
  jQuery(".best_in_place").best_in_place();


  var show_ajax_message = function(msg, type) {
    var cssClass = type === 'error' ? 'negative' : 'positive'
    var html ='<div class="ui message ' + cssClass + '">';
    html +='<i class="close icon"></i>';
    html += msg +'</div>';
    //fade_flash();
    $("#notifications").html(html);
    $('.ui.message .close').click(function() {
      $(this)
        .closest('.message')
        .transition('slide down');
    });
  };

  $(document).ajaxComplete(function(event, request) {
    var msg = request.getResponseHeader('X-Message');
    var type = request.getResponseHeader('X-Message-Type');

    if (type !== null) {
      show_ajax_message(msg, type);
    }
  });

  // Add active class to active menu items
  $('.ui.top.menu > a.item').each( function(index) {
    if (location.pathname.indexOf($(this).attr('href')) >= 0 && !$(this).hasClass('logo')) {
      $(this).addClass('active green');
      $(this).find('.label').addClass('green');
    }
  });
  $('.ui.tabular.menu > a.item').each( function(index) {
    if ($(this).attr('href') == location.pathname) {
      $(this).addClass('active');
    }
  });

  // Initialize Semantic elements
  var initializeDropdowns = function () {
    $('.ui.dropdown').dropdown({
      selectOnKeydown: false,
      forceSelection: false,
      fullTextSearch: true,
      onChange: function(value) {
        var target = $(this).parent();
        if(value) {
    	    target.find('.dropdown.icon').removeClass('dropdown').addClass('delete').on('click', function() {
            target.dropdown('clear');
            $(this).removeClass('delete').addClass('dropdown');
          });
        }
      }
    });
    // Some searches shouldn't be fuzzy
    $('.ui.non-fuzzy.dropdown').dropdown({
      selectOnKeydown: false,
      forceSelection: false,
      fullTextSearch: 'exact',
      onChange: function(value) {
        var target = $(this).parent();
        if(value) {
    	    target.find('.dropdown.icon').removeClass('dropdown').addClass('delete').on('click', function() {
            target.dropdown('clear');
            $(this).removeClass('delete').addClass('dropdown');
          });
        }
      }
    });
    // Allow additions to some dropdowns
    $('.ui.dropdown.allow-addition').dropdown({
      selectOnKeydown: false,
      forceSelection: false,
      fullTextSearch: true,
      allowAdditions: true,
      hideAdditions: false,
      onChange: function(value, text, $choice) {
        var target = $(this);
        if(value) {
          target.find('.dropdown.icon').removeClass('dropdown').addClass('delete').on('click', function() {
            target.dropdown('clear');
            $(this).removeClass('delete').addClass('dropdown');
          });

          // Automatically submit new tags
          if($(this).hasClass("auto-add") && $choice.hasClass('addition')) {
            $(this).submit();
          }
        }
      }
    });
  }
  initializeDropdowns();
  $('.ui.menu .ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
  $('.ui.calendar:not(.datetime)').calendar({
    type: 'date'
  });
  $('.ui.calendar.range-end').each(function() {
    rangeStart = $(this).parent().prev().find('.ui.calendar.range-start')
    $(this).calendar({
      type: 'date',
      startCalendar: rangeStart
    });
  });
  $('.ui.datetime.calendar').calendar();
  $('.sortable.table').tablesort();
  $('.tooltippy').popup();
  $('.ui.modal').modal({onShow: function () {
    initializeDropdowns();
    $('.ui.modal .ui.calendar').calendar({
      type: 'date'
    });
    $('.ui.calendar.range-end').each(function() {
      rangeStart = $(this).parent().prev().find('.ui.calendar.range-start')
      $(this).calendar({
        type: 'date',
        startCalendar: rangeStart
      });
    });
    $('.ui.datetime.calendar').calendar();
  }});

  // Turn file input into a button
  $('.hidden-file-field').hide();
  $('.fake-file-field').click(function(e) {
    $("input[type='file']").click();
  });
  $('.hidden-file-field').change(function() {
    $('.button-text').text(
      $('input[type=file]').val().split('\\').pop()
    );
  });

  // Close alerts
  $('.ui.message .close').click(function() {
    $(this)
      .closest('.message')
      .transition('slide down');
  });

  // Submit button hack
  $('.ui.submit.button').click(function() {
    $(this).parents('form').submit();
  });
  $('.search.link.icon').click(function() {
    if ($(this).prev().val() === '') {
      window.location.pathname = '/admin/search/index'
    } else {
      $(this).parents('form').submit();
    }
  });

  // Modals
  $('.modal-show').click(function() {
    modalId = $(this).attr('id');
    $('.ui.modal#' + modalId).modal('show');
  });

  // Privacy mode toggle
  $('#privacy-mode-toggle').checkbox({
    onChange: function() {
      window.location.pathname = '/admin/privacy_mode'
    }
  });
  $('.checked#privacy-mode-toggle').checkbox('set checked');
});
