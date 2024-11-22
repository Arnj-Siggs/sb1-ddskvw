import React from 'react';
import { Star } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const surveySchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

type SurveyFormData = z.infer<typeof surveySchema>;

interface TicketSatisfactionSurveyProps {
  ticketId: string;
  onSuccess: () => void;
}

export function TicketSatisfactionSurvey({ ticketId, onSuccess }: TicketSatisfactionSurveyProps) {
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
  });

  const selectedRating = watch('rating');

  const mutation = useMutation({
    mutationFn: async (data: SurveyFormData) => {
      // Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', ticketId] });
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How satisfied were you with the resolution of your ticket?
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => {
                const input = document.querySelector(`input[name="rating"][value="${rating}"]`) as HTMLInputElement;
                if (input) {
                  input.checked = true;
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }}
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1"
            >
              <Star
                className={`h-8 w-8 ${
                  rating <= (hoveredRating || selectedRating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          <input
            type="number"
            {...register('rating', { valueAsNumber: true })}
            className="sr-only"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional comments (optional)
        </label>
        <textarea
          {...register('comment')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Tell us more about your experience..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
}