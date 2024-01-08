<script lang="ts">
	export let label = '';
	export let disabled = false;
	let props = { ...$$restProps };
</script>

<button class={props.class} {disabled} style={props.style} props on:click on:*>
	{label}
	<slot />
</button>
