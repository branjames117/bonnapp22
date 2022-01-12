import { useContext } from 'react';
import { ThemeContext } from '../layout/ThemeContext';
import { useSession } from 'next-auth/client';
import classes from './Lineup.module.css';
import Link from 'next/link';
import Card from '../layout/Card';

export default function Lineup() {
  const { darkTheme } = useContext(ThemeContext);

  const [session, _] = useSession();

  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.innerContainer}>
          <div className={classes.day}>Thursday, &nbsp; June &nbsp; 16</div>
          <div
            className={darkTheme ? classes.darkHeadliner : classes.headliner}
          >
            <Link href='/shows/Gryffin'>
              <span className={darkTheme ? '' : classes.blue}>Gryffin</span>
            </Link>
          </div>
          <div className={darkTheme ? classes.darkSubliner : classes.subliner}>
            <Link href='/shows/Clozee'>
              <span>Clozee</span>
            </Link>
            <Link href='/shows/Sidepiece'>
              <span>Sidepiece</span>
            </Link>
            <Link href='/shows/Role Model'>
              <span>Role Model</span>
            </Link>
            <Link href='/shows/The Brook and The Bluff'>
              <span>The Brook & The Bluff</span>
            </Link>
          </div>
          <div className={darkTheme ? classes.dark : classes.thursday}>
            <Link href='/shows/Sons of Kemet'>
              <span>Sons of Kemet</span>
            </Link>
            <Link href='/shows/Goth Babe'>
              <span>Goth Babe</span>
            </Link>
            <Link href='/shows/Blu DeTiger'>
              <span>Blu DeTiger</span>
            </Link>
            <Link href='/shows/Indigo De Souza'>
              <span>Indigo De Souza</span>
            </Link>
            <Link href='/shows/Adam Melchor'>
              <span>Adam Melchor</span>
            </Link>
            <Link href='/shows/The Weather Station'>
              <span>The Weather Station</span>
            </Link>
            <Link href='/shows/Andy Frasco and the UN'>
              <span>Andy Frasco & the U.N.</span>
            </Link>
            <Link href='/shows/Jessie Murph'>
              <span>Jessie Murph</span>
            </Link>
            <Link href='/shows/The Dip'>
              <span>The Dip</span>
            </Link>
            <Link href='/shows/Nothing'>
              <span>Nothing</span>
            </Link>
            <Link href='/shows/Wreckno'>
              <span>Wreckno</span>
            </Link>
            <Link href='/shows/Vnssa'>
              <span>Vnssa</span>
            </Link>
            <Link href='/shows/Weval'>
              <span>Weval</span>
            </Link>
            <Link href='/shows/Kenny Mason'>
              <span>Kenny Mason</span>
            </Link>
            <Link href={'/shows/Calder Allen'}>
              <span>Calder Allen</span>
            </Link>
          </div>
          <div className={classes.day}>Friday, &nbsp; June &nbsp; 17</div>
          <div
            className={darkTheme ? classes.darkHeadliner : classes.headliner}
          >
            <Link href={'/shows/J. Cole'}>
              <span className={darkTheme ? '' : classes.green}>J. Cole</span>
            </Link>
            <Link href='/shows/The Chicks'>
              <span className={darkTheme ? '' : classes.blue}>The Chicks</span>
            </Link>
            <Link href='/shows/Illenium'>
              <span className={darkTheme ? '' : classes.green}>Illenium</span>
            </Link>
          </div>
          <div className={darkTheme ? classes.darkSubliner : classes.subliner}>
            <Link href='/shows/Robert Plant and Alison Krauss'>
              <span className={darkTheme ? '' : classes.pink}>
                Robert Plant & Alison Krauss
              </span>
            </Link>
            <Link href='/shows/Disclosure'>
              <span className={darkTheme ? '' : classes.pink}>Disclosure</span>
            </Link>
            <Link href='/shows/Lord Huron'>
              <span className={darkTheme ? '' : classes.pink}>Lord Huron</span>
            </Link>
            <Link href='/shows/The War on Drugs'>
              <span className={darkTheme ? '' : classes.pink}>
                The War on Drugs
              </span>
            </Link>
          </div>
          <div className={darkTheme ? classes.dark : classes.friday}>
            <Link href='/shows/King Gizzard and the Lizard Wizard'>
              <span>King Gizzard & the Lizard Wizard</span>
            </Link>
            <Link href='/shows/Goose'>
              <span>Goose</span>
            </Link>
            <Link href='/shows/Bleachers'>
              <span>Bleachers</span>
            </Link>
            <Link href='/shows/Isaiah Rashad'>
              <span>Isaiah Rashad</span>
            </Link>
            <Link href='/shows/Lane 8'>
              <span>Lane 8</span>
            </Link>
            <Link href='/shows/Still Woozy'>
              <span>Still Woozy</span>
            </Link>
            <Link href='/shows/Whiskey Myers'>
              <span>Whiskey Myers</span>
            </Link>
            <Link href='/shows/Denzel Curry'>
              <span>Denzel Curry</span>
            </Link>
            <Link href='/shows/Japanese Breakfast'>
              <span>Japanese Breakfast</span>
            </Link>
            <Link href='/shows/Tove Lo'>
              <span>Tove Lo</span>
            </Link>
            <Link href='/shows/Dayglow'>
              <span>Dayglow</span>
            </Link>
            <Link href='/shows/John Summit'>
              <span>John Summit</span>
            </Link>
            <Link href='/shows/Arlo Parks'>
              <span>Arlo Parks</span>
            </Link>
            <Link href='/shows/Chris Lorenzo'>
              <span>Chris Lorenzo</span>
            </Link>
            <Link href='/shows/Tai Verdes'>
              <span>Tai Verdes</span>
            </Link>
            <Link href='/shows/The Regrettes'>
              <span>The Regrettes</span>
            </Link>
            <Link href='/shows/J Worra'>
              <span>J. Worra</span>
            </Link>
            <Link href='/shows/LP GIOBBI'>
              <span>LP GIOBBI</span>
            </Link>
            <Link href='/shows/Briston Maroney'>
              <span>Briston Maroney</span>
            </Link>
            <Link href='/shows/Noga Erez'>
              <span>Noga Erez</span>
            </Link>
            <Link href='/shows/Phantoms'>
              <span>Phantoms</span>
            </Link>
            <Link href='/shows/Ship Wrek'>
              <span>Ship Wrek</span>
            </Link>
            <Link href='/shows/Westend'>
              <span>Westend</span>
            </Link>
            <Link href='/shows/Maggie Rose'>
              <span>Maggie Rose</span>
            </Link>
            <Link href='/shows/Claud'>
              <span>Claud</span>
            </Link>
            <Link href='/shows/Southern Avenue'>
              <span>Southern Avenue</span>
            </Link>
          </div>
          <div className={classes.day}>Saturday, &nbsp; June &nbsp; 18</div>
          <div
            className={darkTheme ? classes.darkHeadliner : classes.headliner}
          >
            <Link href={'/shows/Tool'}>
              <span className={darkTheme ? '' : classes.green}>Tool</span>
            </Link>
            <Link href={'/shows/Flume'}>
              <span className={darkTheme ? '' : classes.pink}>Flume</span>
            </Link>
            <Link href={'/shows/21 Savage'}>
              <span className={darkTheme ? '' : classes.green}>21 Savage</span>
            </Link>
          </div>
          <div className={darkTheme ? classes.darkSubliner : classes.subliner}>
            <Link href='/shows/Billy Strings'>
              <span className={darkTheme ? '' : classes.orange}>
                Billy Strings
              </span>
            </Link>
            <Link href='/shows/Suicideboys'>
              <span className={darkTheme ? '' : classes.orange}>
                $uicideboy$
              </span>
            </Link>
            <Link href='/shows/Porter Robinson'>
              <span className={darkTheme ? '' : classes.orange}>
                Porter Robinson
              </span>
            </Link>
            <Link href='/shows/Marc Rebillet'>
              <span className={darkTheme ? '' : classes.orange}>
                Marc Rebillet
              </span>
            </Link>
            <Link href='/shows/Chvrches'>
              <span className={darkTheme ? '' : classes.orange}>Chvrches</span>
            </Link>
            <Link href='/shows/Lany'>
              <span className={darkTheme ? '' : classes.orange}>Lany</span>
            </Link>
          </div>
          <div className={darkTheme ? classes.dark : classes.saturday}>
            <Link href={'/shows/Ludacris'}>
              <span>Ludacris</span>
            </Link>
            <Link href={'/shows/Chris Lake'}>
              <span>Chris Lake</span>
            </Link>
            <Link href={'/shows/Tobe Nwigwe'}>
              <span>Tobe Nwigwe</span>
            </Link>
            <Link href={'/shows/Judah & the Lion'}>
              <span>Judah & the Lion</span>
            </Link>
            <Link href={'/shows/Mt Joy'}>
              <span>Mt. Joy</span>
            </Link>
            <Link href={'/shows/100 GECS'}>
              <span>100 GECS</span>
            </Link>
            <Link href={'/shows/All Time Low'}>
              <span>All Time Low</span>
            </Link>
            <Link href={'/shows/Nora En Pure'}>
              <span>Nora En Pure</span>
            </Link>
            <Link href={'/shows/Slowthai'}>
              <span>Slowthai</span>
            </Link>
            <Link href={'/shows/Black Tiger Sex Machine'}>
              <span>Black Tiger Sex Machine</span>
            </Link>
            <Link href={'/shows/Ashe'}>
              <span>Ashe</span>
            </Link>
            <Link href={'/shows/Said the Sky'}>
              <span>Said the Sky</span>
            </Link>
            <Link href={'/shows/Pigeons Playing Ping Pong'}>
              <span>Pigeons Playing Ping Pong</span>
            </Link>
            <Link href={'/shows/Joy Oladokun'}>
              <span>Joy Oladokun</span>
            </Link>
            <Link href={'/shows/The Backseat Lovers'}>
              <span>The Backseat Lovers</span>
            </Link>
            <Link href={'/shows/Benee'}>
              <span>Benee</span>
            </Link>
            <Link href={'/shows/Habstrakt'}>
              <span>Habstrakt</span>
            </Link>
            <Link href={'/shows/Lucii'}>
              <span>Lucii</span>
            </Link>
            <Link href={'/shows/Femi Kuti and the Postive Force'}>
              <span>Femi Kuti & the Postive Force</span>
            </Link>
            <Link href={'/shows/Teddy Swims'}>
              <span>Teddy Swims</span>
            </Link>
            <Link href={'/shows/Moore Kismet'}>
              <span>Moore Kismet</span>
            </Link>
            <Link href={'/shows/Patrick Droney'}>
              <span>Patrick Droney</span>
            </Link>
            <Link href={'/shows/Cory Henry'}>
              <span>Cory Henry</span>
            </Link>
            <Link href={'/shows/Lucille Croft'}>
              <span>Lucille Croft</span>
            </Link>
            <Link href={'/shows/Com3t'}>
              <span>Com3t</span>
            </Link>
          </div>
          <div className={classes.day}>Sunday, &nbsp; June &nbsp; 19</div>
          <div
            className={darkTheme ? classes.darkHeadliner : classes.headliner}
          >
            <Link href={'/shows/Stevie Nicks'}>
              <span className={darkTheme ? '' : classes.green}>
                Stevie Nicks
              </span>
            </Link>
            <Link href={'/shows/Machine Gun Kelly'}>
              <span className={darkTheme ? '' : classes.orange}>
                Machine Gun Kelly
              </span>
            </Link>
            <Link href={'/shows/Roddy Ricch'}>
              <span className={darkTheme ? '' : classes.green}>
                Roddy Ricch
              </span>
            </Link>
          </div>
          <div className={darkTheme ? classes.darkSubliner : classes.subliner}>
            <Link href={'/shows/Nathaniel Rateliff and the Night Sweats'}>
              <span className={darkTheme ? '' : classes.yellow}>
                Nathaniel Rateliff & the Night Sweats
              </span>
            </Link>
            <Link href={'/shows/Rezz'}>
              <span className={darkTheme ? '' : classes.yellow}>Rezz</span>
            </Link>
            <Link href={'/shows/Herbie Hancock'}>
              <span className={darkTheme ? '' : classes.yellow}>
                Herbie Hancock
              </span>
            </Link>
            <Link href={'/shows/Puscifer'}>
              <span className={darkTheme ? '' : classes.yellow}>Puscifer</span>
            </Link>
            <Link href={'/shows/Wallows'}>
              <span className={darkTheme ? '' : classes.yellow}>Wallows</span>
            </Link>
          </div>
          <div className={darkTheme ? classes.dark : classes.sunday}>
            <Link href={'/shows/Tash Sultana'}>
              <span>Tash Sultana</span>
            </Link>
            <Link href={'/shows/Coin'}>
              <span>Coin</span>
            </Link>
            <Link href={'/shows/G Jones'}>
              <span>G Jones</span>
            </Link>
            <Link href={'/shows/Zach Bryan'}>
              <span>Zach Bryan</span>
            </Link>
            <Link href={'/shows/All Them Witches'}>
              <span>All Them Witches</span>
            </Link>
            <Link href={'/shows/Tinashe'}>
              <span>Tinashe</span>
            </Link>
            <Link href={'/shows/Fletcher'}>
              <span>Fletcher</span>
            </Link>
            <Link href={'/shows/Tierra Whack'}>
              <span>Tierra Whack</span>
            </Link>
            <Link href={'/shows/Lettuce'}>
              <span>Lettuce</span>
            </Link>
            <Link href={'/shows/Dombresky'}>
              <span>Dombresky</span>
            </Link>
            <Link href={'/shows/Bas'}>
              <span>Bas</span>
            </Link>
            <Link href={'/shows/Protoje'}>
              <span>Protoje</span>
            </Link>
            <Link href={'/shows/Of the Trees'}>
              <span>Of the Trees</span>
            </Link>
            <Link href={'/shows/Sierra Ferrell'}>
              <span>Sierra Ferrell</span>
            </Link>
            <Link href={'/shows/Ravenscoon'}>
              <span>Ravenscoon</span>
            </Link>
            <Link href={'/shows/Wild Rivers'}>
              <span>Wild Rivers</span>
            </Link>
            <Link href={'/shows/Flipturn'}>
              <span>Flipturn</span>
            </Link>
            <Link href={'/shows/A Hundred Drums'}>
              <span>A Hundred Drums</span>
            </Link>
          </div>

          {!session ? (
            <>
              <div className={classes.day}>Hey You, Join The App!</div>
              <p>
                <Link href='/login'>Login</Link> if you're already a member or{' '}
                <Link href='/register'>register</Link> a forever-free account
                with only a username and a password to gain access to the app's
                social features, including friends, commenting on pages, and
                planning your show schedule.
              </p>
              <p>
                If you're going to Bonnaroo 2022 in June, and you don't want to
                waste tedious hours researching each individual show, then
                don't. The hard work has been done for you, and it's all right
                here.
              </p>
            </>
          ) : (
            <div className={classes.day}>See You on the Farm!</div>
          )}
        </div>
      </Card>
    </div>
  );
}
