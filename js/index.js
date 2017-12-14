//jQuery time
var current_fs, next_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();


    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});


$("fieldset.first #zip").on("keyup", function() {
    if ($(this).val() != "" && $("fieldset.first input[type='text']").val() != "") {
        $("fieldset.first input[type='button']").removeAttr("disabled");
    }
});

$("fieldset.first .select").change(function() {
    if ($(this).children(":selected").val() != "") {
        $("fieldset.first input[type='button'].next").removeAttr("disabled");
    }
});
$("fieldset.second #fname").on("keyup", function() {
    if ($(this).val() != "" && $("fieldset.second input[type='text']").val() != "") {
        $("fieldset.second input[type='button']").removeAttr("disabled");
    }
});
$("fieldset.third #tel").on("keyup", function() {
    if ($(this).val() != "" && $("fieldset.third input[type='tel']").val() != "") {
        $("fieldset.third input[type='submit']").removeAttr("disabled");
    }
});

$(".submit").click(function() {
    $(this).closest('form').find("input[type=text], input[type=tel], input[type=password]").val("");
    alert('Form Submited');
    return false;
});