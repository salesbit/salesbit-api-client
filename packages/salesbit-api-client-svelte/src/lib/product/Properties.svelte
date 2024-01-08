<script lang="ts">
	import { onMount } from 'svelte';
	import { type Product, humanizeMoney } from 'salesbit-api-client';

	export let title: string;
	export let product: Product;

	let params: URLSearchParams = new URLSearchParams();

	let price;

	let chunks = [];

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
		price = getPrice(product.prices, chunks);
	});

	const onPropertySelect = () => {
		price = getPrice(product.prices, chunks);
		window.history.pushState({}, '', `?uid=${chunks.join(',')}`);
	};

	const getPrice = (prices, selectedRates) => {
		function containsAllRates(priceRates, selectedRates) {
			return selectedRates.every((selectedRate) =>
				priceRates.some((rate) => rate.id === selectedRate)
			);
		}

		const result = prices.find((price) => containsAllRates(price.rates, selectedRates));

		return result || null;
	};
</script>

{#if product?.properties?.length}
	<div>
		{#if title}
			<h3 class="text-xl">{title}</h3>
		{/if}
		<div class="flex flex-col gap-2">
			{#each product.properties as property, i}
				<div class="flex items-center justify-between">
					<div>{property.label}</div>
					<div>
						{#if property.type === 'radio'}
							{#each property.rates as rate}
								<div>
									<input
										type="radio"
										id={'rate-' + rate.id}
										name={'prop-' + property.id}
										value={rate.id}
										on:change={() => {
											setTimeout(() => {
												chunks[i] = rate.id;
												onPropertySelect();
											}, 10);
										}}
										checked={rate.id === chunks[i]}
									/>
									<label for={'rate-' + rate.id}>{rate.label}</label>
								</div>
							{/each}
						{:else}
							<select
								on:change={() => {
									setTimeout(() => {
										onPropertySelect();
									}, 10);
								}}
								bind:value={chunks[i]}
							>
								{#each property.rates as rate}
									<option value={rate.id}>{rate.label}</option>
								{/each}
							</select>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
<div class="flex justify-between">
	<h3 class="text-xl">Price</h3>
	{#if product.prices?.length}
		{#if price?.price > 0}
			<div>
				{humanizeMoney(price.price)}
			</div>
		{:else}
			n/a
		{/if}
	{:else}
		<div>{humanizeMoney(product.price)}</div>
	{/if}
</div>
