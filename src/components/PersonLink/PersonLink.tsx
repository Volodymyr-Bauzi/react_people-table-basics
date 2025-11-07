import { Person } from '../../types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type PersonLinkProps = {
  person: Person;
  lookup: (name: string) => Person;
};

const PersonLink = ({ person, lookup }: PersonLinkProps) => {
  const { slug } = useParams();
  const selected = slug === person.slug;

  const mother = lookup(person.motherName || '');
  const father = lookup(person.fatherName || '');

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': selected,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.fatherName ? (
          father ? (
            <Link to={`../${father.slug}`}>{person.fatherName}</Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.motherName ? (
          mother ? (
            <Link to={`../${mother.slug}`}>{person.motherName}</Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};

export default PersonLink;
