"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";
import type { ReactNode } from "react";

export type StepState = "upcoming" | "current" | "complete" | "error";

export interface StepperStep {
	id: string;
	label: string;
	description?: string;
	state?: StepState;
	errorMessage?: string;
}

interface StepperProps {
	steps: StepperStep[];
	activeIndex: number;
	onStepChange?: (nextIndex: number) => void;
	canGoNext?: boolean;
	canGoPrev?: boolean;
	onNext?: () => void;
	onPrev?: () => void;
	nextLabel?: string;
	prevLabel?: string;
	finishLabel?: string;
	showFooter?: boolean;
	isLoadingNext?: boolean;
	isLoadingPrev?: boolean;
}

// A modern, compact stepper aligned with the app's design system.
export function Stepper({
	steps,
	activeIndex,
	onStepChange,
	canGoNext = true,
	canGoPrev = true,
	onNext,
	onPrev,
	nextLabel = "Next",
	prevLabel = "Back",
	finishLabel = "Finish",
	showFooter = true,
	isLoadingNext,
	isLoadingPrev,
}: StepperProps) {
	const total = steps.length;

	const handleStepClick = (index: number) => {
		if (index === activeIndex) return;
		onStepChange?.(index);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3">
				{steps.map((step, idx) => {
					const state: StepState =
						step.state ||
						(idx < activeIndex
							? "complete"
							: idx === activeIndex
								? "current"
								: "upcoming");

					const isClickable = onStepChange && idx <= activeIndex;

					return (
						<div key={step.id} className="flex gap-3">
							<div className="flex flex-col items-center">
								<StepBadge state={state} index={idx} hasError={state === "error"} />
								{idx !== total - 1 && (
									<div
										className={cn(
											"ml-[10px] h-8 w-px",
											state === "complete"
												? "bg-primary"
												: state === "error"
													? "bg-destructive/70"
													: "bg-muted-foreground/30",
										)}
									/>
								)}
							</div>

							<button
								type="button"
								onClick={() => handleStepClick(idx)}
								disabled={!isClickable}
								className={cn(
									"group flex-1 text-left rounded-md px-3 py-2 transition",
									"border border-transparent hover:border-border",
									state === "current" && "bg-primary/5 border border-primary/30",
									state === "complete" && "bg-muted/60",
									state === "error" && "bg-destructive/10 border border-destructive/40",
									!isClickable && "cursor-not-allowed opacity-80",
								)}
							>
								<div className="flex items-center justify-between">
									<div className="text-sm font-semibold text-foreground">
										{step.label}
									</div>
									{state === "error" && (
										<AlertCircle className="h-4 w-4 text-destructive" />
									)}
								</div>
								{step.description && (
									<div className="text-xs text-muted-foreground mt-1">
										{step.description}
									</div>
								)}
								{state === "error" && step.errorMessage && (
									<div className="text-xs text-destructive mt-1">{step.errorMessage}</div>
								)}
							</button>
						</div>
					);
				})}
			</div>

			{showFooter && (
				<div className="flex items-center justify-between pt-1">
					<Button
						type="button"
						variant="outline"
						onClick={onPrev}
						disabled={!canGoPrev || isLoadingPrev}
					>
						{prevLabel}
					</Button>

					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						Step {activeIndex + 1} / {total}
					</div>

					<Button
						type="button"
						onClick={onNext}
						disabled={!canGoNext || isLoadingNext}
					>
						{activeIndex === total - 1 ? finishLabel : nextLabel}
					</Button>
				</div>
			)}
		</div>
	);
}

function StepBadge({ state, index, hasError }: { state: StepState; index: number; hasError: boolean }) {
	const base = "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold";

	if (state === "complete") {
		return (
			<div className={cn(base, "bg-primary text-primary-foreground border-primary")}
				aria-label="Step complete">
				<Check className="h-4 w-4" />
			</div>
		);
	}

	if (state === "error") {
		return (
			<div
				className={cn(base, "border-destructive bg-destructive/10 text-destructive")}
				aria-label="Step error"
			>
				<AlertCircle className="h-4 w-4" />
			</div>
		);
	}

	if (state === "current") {
		return (
			<div
				className={cn(base, "border-primary bg-primary/10 text-primary shadow-sm")}
				aria-label="Current step"
			>
				{index + 1}
			</div>
		);
	}

	return (
		<div className={cn(base, "border-muted bg-background text-muted-foreground")}>{index + 1}</div>
	);
}
