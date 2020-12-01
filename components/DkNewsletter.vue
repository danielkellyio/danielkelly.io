<template>
  <form
    action="https://app.convertkit.com/forms/1855271/subscriptions"
    style="background-color: rgb(249, 250, 251); border-radius: 4px"
    class="seva-form formkit-form"
    method="post"
    data-sv-form="1855271"
    data-uid="2331dece78"
    data-format="inline"
    data-version="5"
    data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
    min-width="400 500 600 700 800"
  >
    <div style="opacity: 0.2" class="formkit-background"></div>
    <div data-style="minimal">
      <div
        class="formkit-header"
        style="color: rgb(77, 77, 77); font-size: 27px; font-weight: 700"
        data-element="header"
      >
        <h1>Join the Newsletter</h1>
      </div>
      <div
        class="formkit-subheader"
        style="color: rgb(104, 104, 104); font-size: 18px"
        data-element="subheader"
      >
        Subscribe to get our latest content by email.
      </div>
      <ul
        class="formkit-alert formkit-alert-error"
        data-element="errors"
        data-group="alert"
      ></ul>
      <div
        data-element="fields"
        data-stacked="false"
        class="seva-fields formkit-fields"
      >
        <div class="formkit-field">
          <input
            class="formkit-input"
            name="email_address"
            style="
              color: rgb(0, 0, 0);
              border-color: rgb(227, 227, 227);
              border-radius: 4px;
              font-weight: 400;
            "
            aria-label="Email Address"
            placeholder="Email Address"
            required=""
            type="email"
          />
        </div>
        <button
          data-element="submit"
          class="formkit-submit formkit-submit"
          style="
            color: rgb(255, 255, 255);
            background-color: rgb(22, 119, 190);
            border-radius: 4px;
            font-weight: 400;
          "
        >
          <div class="formkit-spinner">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span class="">Subscribe</span>
        </button>
      </div>
      <div
        class="formkit-guarantee"
        style="color: rgb(77, 77, 77); font-size: 13px; font-weight: 400"
        data-element="guarantee"
      >
        We won't send you spam. Unsubscribe at any time.
      </div>
      <div class="formkit-powered-by-convertkit-container">
        <a
          href="https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"
          data-element="powered-by"
          class="formkit-powered-by-convertkit"
          data-variant="dark"
          target="_blank"
          rel="noopener noreferrer"
          >Built with ConvertKit</a
        >
      </div>
    </div>
  </form>
</template>
<script
  type="application/javascript"
  src="https://f.convertkit.com/ckjs/ck.5.js"
></script>
<script>
export default {}
</script>
