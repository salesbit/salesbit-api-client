<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let product;

	let params: URLSearchParams = new URLSearchParams();

	let price;

	let chunks = [];

	$: if (product?.uuid) {
		chunks = product.uuid.split(',').map((item) => Number(item));
		price = getPrice(product.prices, chunks);
	}

	onMount(async () => {
		params = new URLSearchParams(window.location.search);
		const uid = params.get('uid');
		if (uid) {
			chunks = uid.split(',').map((item) => Number(item));
		} else {
			chunks = [];
			product.properties.forEach((property) => {
				if (property.rate_id) {
					chunks.push(property.rate_id);
				} else {
					chunks.push(property.rates[0].id);
				}
			});
		}
		price = getPrice(product.prices || [], chunks || []);
	});

	const getPrice = (prices, selectedRates) => {
		function containsAllRates(priceRates, selectedRates) {
			return selectedRates.every((selectedRate) =>
				priceRates.some((rate) => rate.id === selectedRate)
			);
		}

		const result = prices.find((price) => containsAllRates(price.rates || [], selectedRates || []));

		return result || null;
	};
</script>

<div>
	{#if title}
		<div>
			<h3 class="text-xl">{title}</h3>
		</div>
	{/if}
	<div class="flex justify-between">
		{#if product?.properties?.length}
			{#if price?.price > 0}
				<div>
					{price.price}
				</div>
			{:else}
				n/a
			{/if}
		{:else}
			<div>{product.price}</div>
		{/if}
	</div>
</div>
