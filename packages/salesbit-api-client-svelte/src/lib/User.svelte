<script lang="ts">
	import { onMount } from 'svelte';
	import { APIClient, type Product } from 'salesbit-api-client';

	export let title: string;
	export let client: APIClient;

	let element;

	onMount(async () => {
		console.log('onMount', client, element);
		const iframe = client.createMe(element, {}, {}, (me) => {
			console.log('me', me);
			iframe;
		});
	});
</script>

{#if client}
	<div>
		{#if title}
			<h3 class="text-xl">{title}</h3>
		{/if}
		<div style="border: 1px solid red; min-height: 100px;">
			<div bind:this={element}></div>
		</div>
	</div>
{:else}
	<div style="color: red;">Client is not defined</div>
{/if}
