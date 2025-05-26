import { ErrorBoundary as SolidErrorBoundary } from "solid-js";
import type { JSX } from "solid-js";

interface ErrorBoundaryProps {
	children: JSX.Element;
	fallback?: (error: Error, reset: () => void) => JSX.Element;
}

const DefaultErrorFallback = (error: Error, reset: () => void) => (
	<div class="p-6 bg-red-50 border border-red-200 rounded-lg">
		<h2 class="text-lg font-semibold text-red-800 mb-2">
			Something went wrong
		</h2>
		<p class="text-red-700 mb-4">{error.message}</p>
		<button
			type="button"
			onClick={reset}
			class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
		>
			Try again
		</button>
	</div>
);

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return (
		<SolidErrorBoundary fallback={props.fallback || DefaultErrorFallback}>
			{props.children}
		</SolidErrorBoundary>
	);
}
