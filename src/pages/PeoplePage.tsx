import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import PeopleTable from '../components/PersonLink/PeopleTable';

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

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {people.length > 0 && <PeopleTable people={people} byName={byName} />}

          {people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
