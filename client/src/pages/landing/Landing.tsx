import CourseSummary from './CourseSummary';
import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';

function Landing() {
  return (
    <>
      <InstructorBillboard />
      <section>
        <CourseSummary
          discount
          isLiked
          courseID='1'
          image='data:image/jpeg;base64,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'
          instructorID='1'
          instructorName='Omar El-Meteny'
          price={15}
          priceAfter={10}
          rating={5}
          title='CSEN704'
        />
      </section>
    </>
  );
}

export default Landing;
