import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import PersonLink from '../components/PersonLink/PersonLink';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => {
        setPeople(data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const byName = useMemo(() => {
    return Object.fromEntries(
      people.map((person: Person) => [person.name, person]),
    );
  }, [people]);

  if (isLoading) {
    return <Loader />;
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.length > 0 &&
            people.map((person: Person) => (
              <PersonLink
                person={person}
                key={person.slug}
                lookup={name => byName[name]}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default PeoplePage;
