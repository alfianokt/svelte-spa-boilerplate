<!-- Views Wrapper / Layout -->

<script>
  import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<div in:scale="{{duration: 500, opacity: 0.5, start: 0.5, easing: quintOut}}">
  <slot />
</div>