<template>
  <form
    action="https://app.convertkit.com/forms/1855271/subscriptions"
    class="seva-form formkit-form text-center bg-gray-300 p-5"
    method="post"
    data-sv-form="1855271"
    data-uid="2331dece78"
    data-format="inline"
    data-version="5"
    data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
    min-width="400 500 600 700 800"
  >
    <ul
      class="formkit-alert formkit-alert-error"
      data-element="errors"
      data-group="alert"
    ></ul>
    <h4 class="text-xl">
      <strong>Join the Newsletter</strong>
    </h4>
    <h5 class="mb-5">Subscribe to get the latest content by email.</h5>

    <div
      data-element="fields"
      data-stacked="false"
      style="max-width: 500px"
      class="seva-fields formkit-fields sm:flex gap-2 mx-auto mb-2"
    >
      <div class="formkit-field w-full sm:w-3/4">
        <input
          class="formkit-input w-full"
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
      <dk-button
        data-element="submit"
        class="formkit-submit formkit-submit w-full sm:w-1/4 mt-3 sm:mt-0"
      >
        <div class="formkit-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span class="">Subscribe</span>
      </dk-button>
    </div>

    <!-- Guarantee -->
    <div
      class="formkit-guarantee text-gray-600 text-sm"
      data-element="guarantee"
    >
      We won't send you spam. Unsubscribe at any time.
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
