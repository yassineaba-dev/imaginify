import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { TransformationForm } from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById, createUser } from "@/lib/actions/user.actions";

const AddImage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  let user = await getUserById(userId);

  if (!user) {
    // 👇 create a new user in your DB if not found
    user = await createUser({
      clerkId: userId,
      creditBalance: 10, // starting credits
    });
  }

  const transformation = transformationTypes[type];
  if (!transformation) redirect("/404");

  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddImage;
