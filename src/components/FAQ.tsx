import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'How does the free consultancy work?',
    answer: 'The first 20 clients who book for each session receive completely free consultancy. Sessions are held twice a month on Saturdays. If all slots are filled, you\'ll be added to a waitlist and notified if a spot opens up.'
  },
  {
    question: 'How long is each consultancy session?',
    answer: 'Each session typically lasts 30-60 minutes, depending on your needs and the complexity of topics discussed. We focus on providing actionable insights tailored to your business.'
  },
  {
    question: 'What topics can I discuss during the consultancy?',
    answer: 'You can discuss any technology or business strategy topics including digital transformation, software development, business growth strategies, tech stack decisions, process optimization, and more.'
  },
  {
    question: 'What if I need to reschedule my appointment?',
    answer: 'You can reschedule by contacting us at support@rastechno.com or calling +1 (555) 123-4567. We recommend notifying us at least 24 hours in advance so we can offer your slot to someone on the waitlist.'
  },
  {
    question: 'Will I receive a follow-up after the session?',
    answer: 'Yes! After your session, we\'ll send you a summary of key discussion points and recommendations via email. You\'re also welcome to reach out with follow-up questions.'
  },
  {
    question: 'Is there a limit to how many times I can book?',
    answer: 'For the free sessions, we encourage giving opportunities to as many companies as possible. However, if you\'d like ongoing consultancy, we offer premium packages that you can discuss during your session.'
  }
];

export function FAQ() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-white/60 text-lg">
          Everything you need to know about our consultancy sessions
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-white/10 bg-slate-900/50 rounded-lg px-6 data-[state=open]:bg-slate-800/50 transition-colors"
          >
            <AccordionTrigger className="text-white hover:text-white/80 text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-white/60 mb-4">Still have questions?</p>
        <a
          href="mailto:support@rastechno.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}
