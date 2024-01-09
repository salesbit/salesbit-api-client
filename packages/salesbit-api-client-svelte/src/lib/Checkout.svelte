<script lang="ts">
	import { onMount } from 'svelte';
	import { APIClient, type Product } from 'salesbit-api-client';

	export let title: string;
	export let client: APIClient;

	let element;

	onMount(async () => {
		console.log('onMount', client, element);
		const iframe = client.createCheckout(
			//document.querySelector('#checkout'),
			element,
			//[{ uid: String(product.id), amount: 1 }],
			[{ uid: '1-17', amount: 1 }],
			{ layout: { '.fields .label': { textDecoration: 'underline' } } },
			(order: Order) => {
				console.log('created order', order);
				iframe;
			}
		);
	});
</script>

{#if client}
	<div>
		{#if title}
			<h3 class="text-xl">{title}</h3>
		{/if}
		<div id="checkout" bind:this={element}></div>
	</div>
{:else}
	<div style="color: red;">Client is not defined</div>
{/if}
