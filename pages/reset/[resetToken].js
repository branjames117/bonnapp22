import Head from 'next/head';
import Grid from '../../components/layout/Grid';
import Reset from '../../components/auth/Reset';
import { connectToDatabase } from '../../lib/db';

export default function ResetPage(props) {
  return (
    <Grid>
      <Head>
        <title>BonnApp22 - Reset Password</title>
        <meta name='description' content={`Reset password page.`} />
      </Head>
      <Reset username={props.username} />
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const client = await connectToDatabase();
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    });
    client.close();
    return {
      notFound: true,
    };
  }

  const db = client.db();
  const resetToken = context.params.resetToken;

  const usersCollection = db.collection('users');

  /* use the dynamic page URL to choose which username to pull from db */
  const fetchedUser = await usersCollection.findOne({
    resetToken,
  });

  client.close();

  /* if user not found in db, 404 */
  if (!fetchedUser) {
    return {
      notFound: true,
    };
  }

  /* use rest operator to separate out the username key */
  const { username, ...user } = fetchedUser;
  return {
    props: {
      username,
    },
  };
}
