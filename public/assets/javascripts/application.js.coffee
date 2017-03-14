#= require jquery
#= require jquery_ujs
#= require vue
#= require_tree .

$ ->
  share_config = {
    networks: {
      pinterest: {
        enabled: false
      }
      reddit: {
        enabled: false
      }
      email: {
        enabled: false
      }
    }
  }
  new ShareButton(share_config)

  # Scroller
  didScroll = undefined
  lastScrollTop = 0
  delta = 50

  $(window).scroll (event) ->
    didScroll = true
    return

  setInterval (->
    if didScroll
      hasScrolled()
      didScroll = false
    return
  ), 250

  hasScrolled = ->
    st = $(window).scrollTop()
    if st > lastScrollTop and st > $(".header").outerHeight()
      $(".header").removeClass("nav-down").addClass("nav-up")
    else
      $(".header").removeClass("nav-up").addClass("nav-down") if st + $(window).height() < $(document).height()
    lastScrollTop = st
    return
